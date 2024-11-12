interface UserProfileParams {
    params: {
      id: string;
    };
  }
  
  export default function UserProfile({ params }: UserProfileParams) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <p className="text-4xl">Profile page = {params.id}</p>
      </div>
    );
  }
  