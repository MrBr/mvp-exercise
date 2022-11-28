import React, { FunctionComponent, useEffect } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { useActiveUser } from "../hooks";
import { User } from "../types";
import { useApi } from "../../app";
import { deposit, reset } from "../requests";

const deposits = [5, 10, 20, 50, 100];

const DepositModal: FunctionComponent<{
  close: () => void;
}> = ({ close }) => {
  const depositApi = useApi(deposit);
  const resetApi = useApi(reset);
  const [user, setUser] = useActiveUser();

  useEffect(() => {
    if (depositApi.response) {
      setUser({ ...(user as User), deposit: depositApi.response.data });
      depositApi.reset();
    }
  }, [depositApi, setUser, user]);

  useEffect(() => {
    if (resetApi.response) {
      setUser({ ...(user as User), deposit: 0 });
      resetApi.reset();
    }
  }, [resetApi, setUser, user]);

  const loading = resetApi.loading || depositApi.loading;
  return (
    <Modal show>
      <Modal.Header>
        {user?.username} deposit: {user?.deposit}
      </Modal.Header>
      <Modal.Body>
        <ButtonGroup>
          {deposits.map((deposit) => (
            <Button
              key={deposit}
              onClick={() => depositApi.fetch({ coins: deposit })}
              disabled={loading}
            >
              {deposit}
            </Button>
          ))}
        </ButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={close}>Close</Button>
        <Button variant="danger" onClick={() => resetApi.fetch()}>
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepositModal;
