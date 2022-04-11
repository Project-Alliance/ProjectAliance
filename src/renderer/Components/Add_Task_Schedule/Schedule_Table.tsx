import React from "react";


interface Item {
  item?: string;
}


const Table = (theadData:any, tbodyData:any, customClass:any ) => {


    const TableHeadItem = ({item}:Item ) => {
      return (
          <td title={item}>
              {item}
          </td>
      );
    };


    const TableRow = (data:any) => {
      return (
          <tr>
              {data.map((item:any) => {
                  return <td key={item}>{item}</td>;
              })}
          </tr>
      );
    };

    return (
        <table className={customClass}>
            <thead>
                <tr>
                    {/* {theadData.map((h:any) => {
                        return <TableHeadItem key={h} item={h} />;
                    })} */}

                </tr>
            </thead>
            <tbody>
                {/* {tbodyData.map((item:any) => {
                    return <TableRow key={item.id} data={item.items} />;
                })} */}
            </tbody>
        </table>
    );
};

export default Table;
