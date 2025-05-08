export enum PriorityEnum {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}

export enum StatusEnum {
  None = 0,
  New = 1,
  UnderProcess = 2,
  Fixed = 3,
}

export enum ComplaintVariant {
  None = 0,
  Product = 1,
  CustomerService = 2,
  Delivery = 3,
  Other = 4,
}

export const priorityIntToEnum = (id: number) => {
  switch (id) {
    case PriorityEnum.None: {
      return "None";
    }
    case PriorityEnum.Low: {
      return "Low";
    }
    case PriorityEnum.Medium: {
      return "Medium";
    }
    case PriorityEnum.High: {
      return "High";
    }
    default:
      return "None";
  }
};

export const statusIntToEnum = (id: number) => {
  switch (id) {
    case StatusEnum.None: {
      return "None";
    }
    case StatusEnum.New: {
      return "New";
    }
    case StatusEnum.UnderProcess: {
      return "Under process";
    }
    case StatusEnum.Fixed: {
      return "Fixed";
    }
    default:
      return "None";
  }
};

export const variantIntToEnum = (id: number) => {
  switch (id) {
    case ComplaintVariant.None: {
      return "None";
    }
    case ComplaintVariant.Product: {
      return "Product";
    }
    case ComplaintVariant.CustomerService: {
      return "CustomerService";
    }
    case ComplaintVariant.Delivery: {
      return "Delivery";
    }
    case ComplaintVariant.Other: {
      return "Other";
    }
    default:
      return "None";
  }
};
