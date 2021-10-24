import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * @author
 * @function ProfileSegment
 **/

const ProfileSegment = (props) => {
      
  return (
    <div className="profile">
      <div class="ui message">
        <h1 class="ui header">
          <i class="user circle icon"></i>
          {props.username}
        </h1>
        <div class="ui segment">
          <div class="ui two column very relaxed grid">
            <div class="column">
              <div class="two row">
                <p class="ui label">FirstName: {props.firstname}</p>
                <p class="ui label">LastName: {props.lastname}</p>
              </div>
            </div>
            <div class="column">
              <div class="two row">
                <p class="ui label">Email: {props.email}</p>
                <p class="ui label">Role: {props.role}</p>
              </div>
            </div>
          </div>
          <div class="ui vertical divider"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSegment;
