import { faker } from "@faker-js/faker";


export const generateUser = () => {
  return {
    dob: faker.date.past({ years: 10 }).toLocaleDateString(),
    gender: faker.helpers.arrayElement(["Male", "Female", "Non-binary"]),
    nationality: faker.location.country(),
    contactNumber: faker.phone.number(),
    emailAddress: faker.internet.email(),
    workEmailAddress: faker.internet.email(),
    research: faker.lorem.sentence(),
    publications: faker.lorem.sentence(),
    id: faker.string.uuid(),
    image: faker.image.avatar(), 
    name: faker.person.fullName(), 
    status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]),
    role: faker.helpers.arrayElement([
      "Product Manager",
      "Product Designer",
      "Frontend Developer",
      "Backend Developer",
    ]), 
    email: faker.internet.email(), 
    teams: faker.helpers.arrayElements(
      ["Design", "Product", "Marketing", "Tehnology"],
      2
    ), 
  };
};


