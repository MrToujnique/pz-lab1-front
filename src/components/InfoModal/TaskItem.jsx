import { Tr } from "@chakra-ui/react";
import { Td } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";

const TaskItem = (props) => {
  const {
    orderNumber,
    taskId,
    name,
    description,
    dateTimeAdded,
    deletetask,
    user,
  } = props;

  return (
    <Tr>
      <Td isNumeric>{orderNumber}</Td>
      <Td isNumeric>{taskId}</Td>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td>{dateTimeAdded}</Td>
      <Td>
        {user.user.role === "ADMIN" && (
          <Button className="delete" onClick={(e) => deletetask(e, taskId)}>
            Wykonano
          </Button>
        )}
      </Td>
    </Tr>
  );
};

export default TaskItem;
