import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import React from "react";

const PasswordProfile = () => {
  return (
    <main>
      <div>
        <InputField
          htmlFor="password"
          label="Password"
          type="password"
          placeholder="Current Password"
        />
        <InputField
          htmlFor="newPassword"
          label="New Password"
          type="password"
          placeholder="New Password"
        />
        <InputField
          htmlFor="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Confirm New Password"
        />

        <Button>Save Change</Button>
      </div>
    </main>
  );
};

export default PasswordProfile;
