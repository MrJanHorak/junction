import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Services
import { getGroupById } from "../../services/groupService";

// Components

const Group = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const groupData = await getGroupById(id);
        console.log("Group Details Data:", groupData);
        setGroup(groupData);
      } catch (error) {
        throw error;
      }
    };
    fetchGroup();
  }, [id]);

  return (
    <div className="layout">
      <div className="group-details">
        {group && (
          <>
            <img src={group.avatar} alt="" />
          </>
        )}
      </div>
    </div>
  );
};

export default Group;
