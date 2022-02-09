import { EuiBasicTable } from "@elastic/eui";
import { useState } from "react";

export interface ICountry {
  code: string;
  name: string;
  emoji: string;
  emojiU: string;
  continent: {
    name: string;
  };
}

export interface ICountriesProps {
  countries: ICountry[];
}

export function Countries({ countries: _countries }: ICountriesProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<keyof ICountry>("name");

  function onTableChange({ sort = {} }: any) {
    setSortDirection(sort.direction);
    setSortField(sort.field);
  }

  const countries = _countries.sort((a, b) => {
    const sortDir = sortDirection === "asc" ? 1 : -1;
    switch (sortField) {
      case "continent":
        return a[sortField].name.localeCompare(b[sortField].name) * sortDir;
      default:
        return a[sortField].localeCompare(b[sortField]) * sortDir;
    }
  });

  return (
    <EuiBasicTable
      style={{
        border: "double #E8ECEF",
        padding: 2,
        backgroundColor: "white",
      }}
      tableCaption="Countries"
      items={countries}
      onChange={onTableChange}
      columns={[
        {
          field: "emoji",
          name: "Flag",
          sortable: true,
          render: (emoji: string) => (
            <span
              title="This is supposed to be a flag, if all you see are two letters then its the browsers fault. I am sorry for this but the (time)budget was not big enough for a better solution"
              style={{ fontSize: 22 }}
            >
              {emoji}
            </span>
          ),
        },
        { field: "name", name: "Country" },
        { field: "code", name: "ISO code" },
        {
          field: "continent",
          name: "Continent",
          render: (data: any) => data.name,
        },
      ]}
      sorting={{
        sort: {
          field: sortField,
          direction: sortDirection,
        },
        enableAllColumns: true,
      }}
    />
  );
}
