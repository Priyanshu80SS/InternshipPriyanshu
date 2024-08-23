import { faker } from "@faker-js/faker";

// Generate fake data
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
    image: faker.image.avatar(), // Generates a random avatar image URL
    name: faker.person.fullName(), // Generates a random name
    status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]), // Randomly selects a status
    role: faker.helpers.arrayElement([
      "Product Manager",
      "Product Designer",
      "Frontend Developer",
      "Backend Developer",
    ]), // Randomly selects a role
    email: faker.internet.email(), // Generates a random email address
    teams: faker.helpers.arrayElements(
      ["Design", "Product", "Marketing", "Tehnology"],
      2
    ), // Selects random teams (2 in this case)
  };
};

// Generate and log the data
const user = generateUser();
console.log(user);
