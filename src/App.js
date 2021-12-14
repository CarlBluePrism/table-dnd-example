import "./App.css";
import faker from "faker";
import Table from "./components/table/Table";

const columns = [
  { label: "First Name", accessor: "firstName" },
  { label: "Last Name", accessor: "lastName" },
  { label: "Address line 1", accessor: "addressLineOne" },
  { label: "Address line 2", accessor: "addressLineTwo" },
  { label: "City", accessor: "city" },
  { label: "Post Code", accessor: "postCode" },
];
const rows = [...Array(10)].map((_, index) => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    addressLineOne: faker.address.streetAddress(),
    addressLineTwo: faker.address.secondaryAddress(),
    city: faker.address.city(),
    postCode: faker.address.zipCode(),
  };
});

function App() {
  return (
    <div className="App">
      <Table columns={columns} data={rows} />
    </div>
  );
}

export default App;
