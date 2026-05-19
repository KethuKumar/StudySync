import { useEffect } from "react";

import { useDispatch, useSelector }
from "react-redux";

import {
  fetchResources
} from "../features/resource/resourceSlice";

import ResourceCard from "./ResourceCard";

const ResourceList = ({ groupId }) => {

  const dispatch = useDispatch();

  const { resources } = useSelector(
    (state) => state.resources
  );

  const resourceItems = Array.isArray(resources) ? resources : [];

  useEffect(() => {
    dispatch(fetchResources(groupId));
  }, [dispatch, groupId]);

  return (
    <div className="space-y-4">

      {resourceItems.map((resource) => (
        <ResourceCard
          key={resource._id}
          resource={resource}
        />
      ))}

    </div>
  );
};

export default ResourceList;
