import { Tr } from "@chakra-ui/react";
import { Td } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";

import FileUploader from "./../FileUploader/FileUploader";

const TaskItem = (props) => {
  const { orderNumber, taskId, name, description, dateTimeAdded } = props;

  return (
    <Tr>
      <Td isNumeric>{orderNumber}</Td>
      <Td isNumeric>{taskId}</Td>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td>{dateTimeAdded}</Td>
      <Td>
        <FileUploader taskData={props} />
      </Td>
      {/* <Td>
        <Button className="delete" onClick={(e) => deletetask(e, taskId)}>
          Wykonano
        </Button>
      </Td> */}
    </Tr>
  );
};

export default TaskItem;
