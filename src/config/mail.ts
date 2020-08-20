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
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'fabriciopolicarpo@zohomail.com',
      name: 'Fabricio from GoBarber'
    }
  }
} as IMailConfig
