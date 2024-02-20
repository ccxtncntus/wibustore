import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { FormatNumber } from "../../../helpers/FormatNumber";
const Dashboarđetail = ({ best }) => {
  const [u, setu] = useState(null);
  const [pro, setpro] = useState(null);
  useEffect(() => {
    if (best) {
      setu(best.bestUser[0]);
      setpro(best.productsBest);
    }
  }, [best]);
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
            <td>{u && u.name}</td>
            <td>
              Tiêu nhiều nhất <br />
              {u && FormatNumber(Number(u.totail))}
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
            <td>{pro && pro.name}</td>
            <td>
              Bán chạy nhất <br />
              {pro && pro.bought} sp
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboarđetail;
