import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  
  const posts = [{
    id: 1,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1741758993155_6-4.jpg",
  },
{
  id: 2,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1741758867669_7-6.jpg",
  },
{
  id: 3,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1742439558879_4-4.jpg",
  },
{
  id: 4,
    name: "sustainable living through cutting-edge prefabricated homes",
    description: "Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...Give2 lady of they such they sure it. Me contained explained my education. Vulgar as hearts by ...",
    img: "/images/1741758993155_6-4.jpg",
  }]
  const { id } = useParams();

  const [selectedPost, setSelectedPost] = useState(posts[id - 1]);

  return (
    <div className=" text-primary flex  flex-col-reverse md:flex-row gap-6 p-6">
      {/* الصورة والنص الرئيسي */}
      <Card className=" !shadow-none !flex-1">
        <img
          src={selectedPost.img}
          alt={selectedPost.name}
          className="w-full h-[550px] object-cover"
        />
        <CardContent>
          <Typography variant="h7">{selectedPost.description}</Typography>
        </CardContent>
      </Card>

      {/* القائمة الجانبية */}
      <div className="flex flex-col gap-4 w-full md:w-[300px]">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`flex gap-3 items-center cursor-pointer p-2 rounded-lg hover:bg-red-50 transition 
              ${selectedPost.id === post.id ? "bg-red-50" : "border-gray-300"}`}
          >
            <img 
              src={post.img}
              alt={post.name}
              className="w-20 h-20 object-cover rounded"
            />
            <p className="text-sm">{post.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
