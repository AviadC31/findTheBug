export const userColumns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName"
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "Bugs",
      dataIndex: "bugs",
      key: "bugs"
    }
  ]
  

