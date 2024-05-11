import { Button, Col, Container, Row } from "react-bootstrap";
import { TopNav } from "../components/TopNav";
import { Footer } from "../components/Footer";
import { AuthComp } from "../components/AuthComp";

import { NewTransForm } from "../components/NewTransForm";
import { TransactionTable } from "../components/TransactionTable";

import { CustomModal } from "../components/CustomModal";
import { useUser } from "../UserContext";

const Dashboard = () => {
  const { loggedInUser, setShowForm } = useUser();

  return (
    <AuthComp>
      {/* header  */}
      <TopNav />
      {/* main body  */}
      <Container className="main pt-2">
        <h4>Dashboar | Welcome back {loggedInUser?.name}</h4>
        <hr />
        <CustomModal title="Add new transaction">
          <NewTransForm />
        </CustomModal>

        <Row>
          <Col className="text-end">
            <Button onClick={() => setShowForm(true)}>
              Add New Transaction
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <TransactionTable />
          </Col>
        </Row>
      </Container>{" "}
      {/* footer  */}
      <Footer />
    </AuthComp>
  );
};

export default Dashboard;
