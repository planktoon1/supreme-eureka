import { gql, useQuery } from "@apollo/client";
import { EuiFieldSearch, EuiLoadingSpinner, EuiTitle } from "@elastic/eui";
import { useState } from "react";
import { Countries, ICountry } from "./components/Countries";

const COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(COUNTRIES);

  const countries: ICountry[] = data ? [...data.countries] : [];
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCountries = countries.filter((country) =>
    country.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  if (error) return <div>Am I fired?</div>;

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 1200 }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <EuiTitle size="l">
            <h1 style={{ marginRight: 8 }}>🌏 The Country List</h1>
          </EuiTitle>
          <EuiFieldSearch
            incremental
            disabled={loading}
            onSearch={setSearchTerm}
            placeholder="Seach for country by name"
          />
        </div>
        {loading && <EuiLoadingSpinner size="xl" />}
        {!loading && <Countries countries={filteredCountries} />}
      </div>
    </div>
  );
}

export default App;
