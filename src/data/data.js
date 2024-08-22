// import { faker } from "@faker-js/faker";

// // Generate personal details for each person
// export const generatePersonalDetails = () => ({
//   userId: faker.datatype.uuid(),
//   image: faker.image.avatar(),
//   name: faker.name.findName(),
//   status: faker.random.arrayElement(["Active", "Inactive"]),
//   role: faker.random.arrayElement([
//     "Developer",
//     "Designer",
//     "Manager",
//     "Tester",
//   ]),
//   dob: faker.date.past(30, "2000-01-01").toLocaleDateString(),
//   gender: faker.random.arrayElement(["Male", "Female", "Non-binary"]),
//   nationality: faker.address.country(),
//   contactNumber: faker.phone.phoneNumber(),
//   emailAddress: faker.internet.email(),
//   workEmailAddress: faker.internet.email(),
//   research: faker.lorem.sentence(),
//   publications: faker.lorem.sentence(),
// });

// // Generate a list of people with summary details
// export const generatePeople = (num = 100) => {
//   return Array.from({ length: num }, () => ({
//     id: faker.datatype.uuid(),
//     image: faker.image.avatar(),
//     name: faker.name.findName(),
//     status: faker.random.arrayElement(["Active", "Inactive"]),
//     role: faker.random.arrayElement([
//       "Developer",
//       "Designer",
//       "Manager",
//       "Tester",
//     ]),
//     email: faker.internet.email(),
//     team: faker.random.arrayElement(["Team A", "Team B", "Team C"]),
//     personalDetails: generatePersonalDetails(),
//   }));
// };

// Import the faker module
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
