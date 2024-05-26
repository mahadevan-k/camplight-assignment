import { PrismaClient, Prisma } from '@prisma/client';
import { parsePhoneNumber } from 'libphonenumber-js';

export interface UserData {
  name: string
  email: string
  phone: string
}

class UserService {
  prisma:PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  //TODO: remove hardcoding of limit and offset
  getUsers = async (page:number=1, page_size:number=20) => {
    return {
      users: await this.prisma.user.findMany({take: page_size, skip: (page-1)*page_size}),
      pages: Math.trunc(((await this.prisma.user.count())/page_size)+1)
    }
  }

  addUser = async (userData: UserData) => {
    const { name, email, phone } = userData;
    
    let hasErrors:boolean = false;
    let errors:{[id: string]: string[]} = {};
    errors["general"] = [];
    errors["name"] = [];
    errors["email"] = [];
    errors["phone"] = [];

    // is the name valid?
    if(!name) {
      errors["name"].push("not a valid name");
      hasErrors=true;
    }

    // is the email valid?
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors["email"].push("not a valid email address");
      hasErrors=true;
    }

    // is the phone number valid?
    try {
      const parsedNumber=parsePhoneNumber(phone);
      if(!parsedNumber.isValid()) {
        errors["phone"].push("not a valid phone number");
        hasErrors=true;
      }
    } catch(error:unknown) {
      errors["phone"].push("not a valid phone number");
      hasErrors=true;
    }

    

    if(hasErrors)
      return {"errors": errors}

    try {
      if(!hasErrors) {
        const newUser = await this.prisma.user.create({
          data: {
            name,
            email,
            phone
          }
        });

        return {"user": newUser};
      }
    } catch(error:unknown) {
      console.log("users/addUser: "+(error as Error).message);
      // are there any duplicate records?
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code == "P2002") {
        errors["general"].push("A user with the same name, email or phone number already exists");
      } else if(error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError) {
        errors["general"].push("we had some issue with the database, please try again");
      } else {
        errors["general"].push("Unknown error, please report this to the administrator");
      }
    }

    return {"errors":errors};
  };

  deleteUser = async (id: number) => {
    const record = await this.prisma.user.findUnique({where: {id}});

    if(record)
      await this.prisma.user.delete({where: {id}});

    return record ? undefined : {"errors": { "general": ["user not found"]}};
  }
}

export default UserService
