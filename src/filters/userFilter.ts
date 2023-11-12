import { ApiFilter } from "./apiFilter";

export class CustomerFilter extends ApiFilter {
  constructor() {
    super();

    this.safeParms = {
      firstName: ["eq"],
      lastName: ["eq"],
      username: ["eq"],
      email: ["eq"],
      phone: ["eq"],
    };

    this.columnMap = {
      phone: "phoneNumber",
    };

    this.operatorMap = {
      eq: "=",
      lt: "<",
      lte: "<=",
      gt: ">",
      gte: ">=",
    };
  }
}
