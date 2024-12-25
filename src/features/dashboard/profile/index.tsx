import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralProfile from "./components/GeneralProfile";
import PasswordProfile from "./components/PasswordProfile";

const ProfilePage = () => {
  return (
    <main className="w-full">
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-slate-600">Your Profile</h1>
      </div>

      <Tabs defaultValue="general" className="my-2 w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="password">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralProfile />
        </TabsContent>

        <TabsContent value="password">
          <PasswordProfile />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ProfilePage;
