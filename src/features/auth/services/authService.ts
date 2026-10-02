export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  async register(
    payload: RegisterPayload,
  ): Promise<RegisterResponse> {
    // API integration will be added here.
    console.log("Register payload:", {
      name: payload.name,
      email: payload.email,
    });

    return {
      user: {
        id: "temporary-id",
        name: payload.name,
        email: payload.email,
      },
    };
  },
};