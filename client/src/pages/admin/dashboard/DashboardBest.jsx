import Table from "react-bootstrap/Table";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const Dashboarđetail = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="overview_all mt-2">
      Top
      <Table hover>
        <tbody>
          <tr>
            <td>
              <img
                className="overview_all_imgstt"
                src="https://i.pinimg.com/564x/58/7f/1f/587f1fdc52c2470e01b31b861e02c1a5.jpg"
                alt=""
              />
            </td>
            <td>
              <img
                className="overview_all_imgssp"
                src="https://i.pinimg.com/564x/10/9d/db/109ddb5bfe0f56d9152245a97a9e23b6.jpg"
                alt=""
              />
            </td>
            <td>Vip</td>
            <td>
              Tiêu nhiều nhất <br />
              180.000.000đ
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="overview_all_imgstt"
                src="https://i.pinimg.com/564x/58/7f/1f/587f1fdc52c2470e01b31b861e02c1a5.jpg"
                alt=""
              />
            </td>
            <td>
              <img
                className="overview_all_imgssp"
                src="https://i.pinimg.com/564x/89/81/bb/8981bb16a35baa7e82fbcc86d9ac6634.jpg"
                alt=""
              />
            </td>
            <td>natsu</td>
            <td>
              Bán chạy nhất <br />
              120sp
            </td>
          </tr>
        </tbody>
      </Table>
      <Stack>
        <Pagination
          count={10}
          page={page}
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </Stack>
      {/* <Typography>Page: {page}</Typography> */}
    </div>
  );
};

export default Dashboarđetail;
