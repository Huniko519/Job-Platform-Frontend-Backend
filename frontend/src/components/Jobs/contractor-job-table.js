import React, { useState } from "react";
import { Button, Table } from "reactstrap";
import { FaWeixin } from "react-icons/fa";

import JobModal from "../modal";
import JobDescription from "../JobDescription";
import { JobStatuses } from "../../constants/mockup";
import { Link } from "react-router-dom";

const ContractorTable = ({ styles, tableHeaders, data }) => {
 // console.log("ContractorTable Data", data);
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
    //console.log(id);
    setModal(true);
  };

  const dataTd = (header, data) => {
    switch (header.key) {
      case "address":
        return (
          <td key={"td-" + header.key} className="text-center">
            <Button color="link" onClick={() => handleDetail(data[header.key])}>
              {data[header.key]}
            </Button>
          </td>
        );
      case "messages":
        return data[header.key] == 0 ? (
          <td key={"td-" + header.key} className="text-center">
            <Link to={`/contractor/detail/${data.case_no}`}>
              <FaWeixin size={32} />
            </Link>
          </td>
        ) : (
          <td key={"td-" + header.key} className="text-center message-badge">
            <Link to={`/contractor/detail/${data.case_no}`}>
              <FaWeixin size={32} />
              <span>{data[header.key]}</span>
            </Link>
          </td>
        );
      case "action":
        return (
          <td key={"td-" + header.key} className="text-center">
            <Link to={`/contractor/detail/${data.case_no}`}>See more...</Link>
            {/* &nbsp;&nbsp;&nbsp;&nbsp;
            {!(
              data.status === "waiting" ||
              data.status === "pending" ||
              data.status === "approved"
            ) && <a href={`/contractor/detail/${data.case_no}`}>See more...</a>} */}
          </td>
        );
      case "status":
        return (
          <td key={"td-" + header.key} className="text-center">
            {JobStatuses.find((item) => item.value === data[header.key])?.label}
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
          {data.map((item, idx) => (
            <tr key={"tr-" + item.case_no}>
              {tableHeaders.map((header) => {
                return dataTd(header, item);
              })}
            </tr>
          ))}
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
export default ContractorTable;
