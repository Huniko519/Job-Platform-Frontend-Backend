import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { FaWeixin } from "react-icons/fa";

import JobModal from "../modal";
import JobDescription from "../JobDescription";
import { Link } from "react-router-dom";

const JobTable = ({ styles, tableHeaders, data, active = true }) => {
  console.log("data", data);
  const tableStyle = styles || { tableClass: "job-table" };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const jobDescription = {
    customerAddress: {
      addressLine: "Standakerveien 159",
      postalCode: "0150",
      city: "Oslo",
    },
    contactPerson: {
      firstName: "Test",
      lastName: "Test",
    },
    mobile: "909090909",
  };

  const handleDetail = (id) => {
    // console.log(id);
    setModal(true);
  };

  const dataTd = (header, data) => {
    switch (header.key) {
      case "title":
        return (
          <td key={"td-" + header.key} className="text-center">
            <Button color="link" onClick={() => handleDetail(data[header.key])}>
              {data[header.key]}
            </Button>
          </td>
        );
      case "messages":
        return (
          <td key={"td-" + header.key} className="text-center message-badge">
            <Link to={`/houseowner/detail/${data._id}`}>
              <FaWeixin size={24} />
              {data[header.key] && data[header.key] > 0 && (
                <span>{data[header.key]}</span>
              )}
            </Link>
          </td>
        );
      case "action":
        return (
          <td key={"td-" + header.key} className="text-center">
            <Link to={`/houseowner/detail/${data._id}`}>
              {data[header.key]}
            </Link>
          </td>
        );
      default:
        return (
          <td key={"td-" + header.key} className="text-center">
            {data[header.key]}
          </td>
        );
    }
  };

  return (
    <div>
      <Table className={tableStyle.tableClass} borderless>
        <thead>
          <tr>
            {tableHeaders.map((header, idx) => (
              <th className={header.class} key={"th-" + idx}>
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data
              // .filter((item) => item.active === active)
              .map((item, idx) => (
                <tr key={"tr-" + item.id}>
                  {tableHeaders.map((header) => {
                    return dataTd(header, item);
                  })}
                </tr>
              ))
          ) : (
            <tr>
              <td align="center" colSpan={tableHeaders.length}>
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <JobModal
        modal={modal}
        toggle={toggle}
        title="Detail"
        content={<JobDescription jobData={jobDescription} />}
        // buttons={[{style: 'primary', text: 'Board', callback: handleBoard}, {style: 'info', text: 'Private', callback: handlePrivate}]}
      />
    </div>
  );
};
export default JobTable;
