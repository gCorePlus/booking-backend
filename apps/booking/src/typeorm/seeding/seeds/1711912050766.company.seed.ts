import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { BusinessType, Company, CompanyContact, ContactType, Employee, Partner, Service } from '../../../entities';

export default class CompanySeed1711912050766 implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const companyRepository = dataSource.getRepository(Company);
    const partnerRepository = dataSource.getRepository(Partner);
    const businessTypeRepository = dataSource.getRepository(BusinessType);
    const contactTypeRepository = dataSource.getRepository(ContactType);

    const companyFactory = factoryManager.get(Company);
    const employeeFactory = factoryManager.get(Employee);
    const serviceFactory = factoryManager.get(Service);
    const companyContactFactory = factoryManager.get(CompanyContact);

    const partners = await partnerRepository.find();
    const businessTypes = await businessTypeRepository.find();
    const contactTypes = await contactTypeRepository.find();

    const companies = await Promise.all(
      Array(faker.number.int({ min: 1, max: 10 }))
        .fill('')
        .map(async () => {
          const company = await companyFactory.make();

          company.owners = Array(faker.number.int({ min: 1, max: 2 }))
            .fill('')
            .map(() => faker.helpers.arrayElement(partners));

          company.businessType = faker.helpers.arrayElement(businessTypes);

          company.contacts = await Promise.all(
            Array(faker.number.int({ min: 1, max: 2 }))
              .fill('')
              .map(async () => {
                const contactType = faker.helpers.arrayElement(contactTypes);

                companyContactFactory.setMeta({ type: contactType });
                return companyContactFactory.make({ type: contactType });
              })
          );

          company.employees = await Promise.all(
            Array(faker.number.int({ min: 1, max: 5 }))
              .fill('')
              .map(async () => {
                const employee = await employeeFactory.make();

                employee.partner = faker.helpers.arrayElement(partners);

                return employee;
              })
          );

          company.services = await Promise.all(
            Array(faker.number.int({ min: 1, max: 5 }))
              .fill('')
              .map(async () => serviceFactory.make())
          );

          return company;
        })
    );

    await companyRepository.save(companies);
  }
}
