import * as z from "zod";
const { object, string } = z;

export const signInFormSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInFormValues = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  fullName: string({ required_error: "Username is required" })
    .min(4, "Fullname is required")
    .max(32, "Fullname must be less than 32 characters"),
});
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const updateFullnameSchema = object({
  fullName: string({ required_error: "Username is required" })
    .min(4, "Fullname is required")
    .max(32, "Fullname must be less than 32 characters"),
});

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().min(1, "Product price is required"),
  quantity: z.number().min(1, "Product quantity is required"),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Product Image is Required, Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export const addressFormSchema = z.object({
  addressName: z.string().min(1, "Address name is required"),
  fullAddress: z.string().min(1, "Full address is required"),
});
