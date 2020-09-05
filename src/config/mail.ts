interface IMailConfig {
  driver: 'ethereal' | 'ses',
  defaults: {
    from: {
      email: string;
      name: string;
    }
  }
}

export default {
  driver: 'ethereal',
  defaults: {
    from: {
      email: 'fabriciopolicarpo@zohomail.com',
      name: 'Fabricio from GoBarber'
    }
  }
} as IMailConfig
