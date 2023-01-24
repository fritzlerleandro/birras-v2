import {useState, useEffect} from "react";

import {supabase} from "utils/supabaseClient";

import Avatar from "./Avatar";

export default function Account({session}) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let {data, error, status} = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({username, website, avatar_url}) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      console.log("usertoken: ", user.access_token);
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let {error} = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        {/* <pre>
          {session && <code>{JSON.stringify(session, null, 2)}</code>}
          {session?.access_token && <code>{JSON.stringify(session.access_token, null, 2)}</code>}
        </pre> */}
        <Avatar
          size={150}
          url={avatar_url}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({username, website, avatar_url: url});
          }}
        />
        <label htmlFor="email">Email</label>
        <input disabled id="email" type="text" value={session.user.email} />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          disabled={loading}
          onClick={() => updateProfile({username, website, avatar_url})}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
