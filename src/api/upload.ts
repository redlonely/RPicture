import http from "@/utils/axios";

const upload = async (formData: FormData) => {
  return http.post("/api/upload", {
    body: formData,
  });
};
