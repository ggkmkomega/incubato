import React from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  return <div>Meeting Room number #{params.id}</div>;
};

export default Meeting;
