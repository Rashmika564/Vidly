import React, { Component } from "react";

const Input = ({ name, label, value, onChange, error, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        className="form-control"
        value={value}
        name={name}
        autoComplete="off"
        onChange={onChange}
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
