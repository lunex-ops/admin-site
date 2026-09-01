"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ArrowLeft, ImagePlus, Save, UserRound, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";

import { useUpdateUser, useUser } from "@/hooks/apis/useUsers";
import { RoleType, UpdateUserInput, User } from "@/types/user.types";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const roles = [
  {
    value: "SUPER_ADMIN",
    label: "Super Admin",
  },
  {
    value: "ADMIN",
    label: "Admin",
  },
  {
    value: "MODERATOR",
    label: "Moderator",
  },
  {
    value: "USER",
    label: "User",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const editUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  role: z.enum(["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"]),

  isActive: z.boolean(),

  photo: z.string().nullable(),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const getDefaultValues = (user: User): EditUserFormValues => ({
  username: user.username,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  photo: user.photo,
});

const formatValue = (value: string | null | undefined) => {
  if (!value) return "—";

  return value
    .replace(/\_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/* -------------------------------------------------------------------------- */
/*                                Field Error                                 */
/* -------------------------------------------------------------------------- */

interface FieldErrorProps {
  message?: string;
}

const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;

  return <p className="text-xs text-danger">{message}</p>;
};

/* -------------------------------------------------------------------------- */
/*                              Edit User Form                                */
/* -------------------------------------------------------------------------- */

interface EditUserFormProps {
  user: User;
}

const EditUserForm = ({ user }: EditUserFormProps) => {
  const router = useRouter();

  const updateUser = useUpdateUser();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(
    user.photo ?? null,
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: getDefaultValues(user),
  });

  const role = watch("role");
  const isActive = watch("isActive");
  const photo = watch("photo");

  /* ------------------------------------------------------------------------ */
  /*                              Photo Preview                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    return () => {
      if (photoPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  /* ------------------------------------------------------------------------ */
  /*                              Photo Handler                               */
  /* ------------------------------------------------------------------------ */

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.add({
        type: "error",
        description: "Please select a valid image file.",
        priority: "high",
      });

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        type: "error",
        description: "Image size must be less than 5MB.",
        priority: "high",
      });

      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPhotoPreview(previewUrl);

    /*
     * Store the selected file URL in the form for now.
     *
     * If your API expects multipart/form-data, replace this with
     * a File-based field and construct FormData in handleFormSubmit.
     */
    setValue("photo", previewUrl, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  /* ------------------------------------------------------------------------ */
  /*                              Remove Photo                                */
  /* ------------------------------------------------------------------------ */

  const handleRemovePhoto = () => {
    if (photoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoPreview(null);

    setValue("photo", null, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ------------------------------------------------------------------------ */
  /*                               Form Submit                                */
  /* ------------------------------------------------------------------------ */

  const handleFormSubmit = (values: EditUserFormValues) => {
    const payload: UpdateUserInput = {
      username: values.username,
      email: values.email,
      role: values.role as RoleType,
      isActive: values.isActive,
      photo: values.photo,
    };

    updateUser.mutate(
      {
        id: user.id,
        payload,
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "User updated successfully.",
          });

          router.push(`/users/${user.id}`);
        },

        onError: () => {
          toast.add({
            type: "error",
            description: "Failed to update user. Please try again.",
            priority: "high",
          });
        },
      },
    );
  };

  /* ------------------------------------------------------------------------ */
  /*                                  Render                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="space-y-6">
        {/* ---------------------------------------------------------------- */}
        {/* User Information                                                  */}
        {/* ---------------------------------------------------------------- */}

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>

            <p className="text-sm text-muted-foreground">
              Update the account information and permissions for this user.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Username */}

              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>

                <Input
                  id="username"
                  {...register("username")}
                  placeholder="Username"
                  aria-invalid={!!errors.username}
                />

                <FieldError message={errors.username?.message} />
              </div>

              {/* Email */}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>

                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="user@example.com"
                  aria-invalid={!!errors.email}
                />

                <FieldError message={errors.email?.message} />
              </div>

              {/* Role */}

              <div className="space-y-2.5">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>

                <Select
                  value={role}
                  onValueChange={(value) =>
                    setValue("role", value as RoleType, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <SelectTrigger
                    aria-invalid={!!errors.role}
                    className="h-11 w-full rounded-md border-border bg-background px-3 text-sm shadow-sm transition-colors hover:border-primary/50 focus:ring-2 focus:ring-primary/20 data-placeholder:text-muted-foreground"
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>

                  <SelectContent>
                    {roles.map((roleOption) => (
                      <SelectItem
                        key={roleOption.value}
                        value={roleOption.value}
                        className="cursor-pointer"
                      >
                        {roleOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FieldError message={errors.role?.message} />
              </div>

              {/* Account Status */}

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Status</label>

                <div className="flex h-11 items-center justify-between border border-border bg-background px-3">
                  <div>
                    <p className="text-sm font-medium">
                      {isActive ? "Active" : "Inactive"}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {isActive
                        ? "User can access the admin application."
                        : "User cannot access the admin application."}
                    </p>
                  </div>

                  <Switch
                    checked={isActive}
                    onCheckedChange={(checked) =>
                      setValue("isActive", checked, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <FieldError message={errors.isActive?.message} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* Profile Photo                                                     */}
        {/* ---------------------------------------------------------------- */}

        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>

            <p className="text-sm text-muted-foreground">
              Upload a profile image for this user. Maximum file size is 5MB.
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Preview */}

              <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden border border-border bg-muted">
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt={`${user.username} profile`}
                    className="size-full object-cover"
                  />
                ) : (
                  <UserRound className="size-10 text-muted-foreground/50" />
                )}
              </div>

              {/* Upload Controls */}

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="size-4" />
                    {photo ? "Change Photo" : "Upload Photo"}
                  </Button>

                  {photoPreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleRemovePhoto}
                    >
                      <X className="size-4" />
                      Remove
                    </Button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  JPG, PNG, WEBP or other supported image formats.
                </p>

                {errors.photo && <FieldError message={errors.photo.message} />}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* Account Details                                                   */}
        {/* ---------------------------------------------------------------- */}

        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>

            <p className="text-sm text-muted-foreground">
              Information about the current user account.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  User ID
                </p>

                <p className="break-all text-sm font-medium">{user.id}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Current Role
                </p>

                <p className="text-sm font-medium">{formatValue(user.role)}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Password Status
                </p>

                <p className="text-sm font-medium">
                  {user.passwordChangedAt
                    ? "Password has been changed"
                    : "Password has not been changed"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------------------------------------------------------------- */}
        {/* Actions                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="flex flex-col-reverse gap-2 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/users/${user.id}`)}
            disabled={updateUser.isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={updateUser.isPending}>
            <Save className="size-4" />

            {updateUser.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Edit User Page                                */
/* -------------------------------------------------------------------------- */

const EditUserPage = () => {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } = useUser(id);

  const user = data?.data?.user;

  /* ------------------------------------------------------------------------ */
  /* Loading                                                                  */
  /* ------------------------------------------------------------------------ */

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-4 w-24 animate-pulse bg-muted" />

          <div className="mt-4 h-9 w-48 animate-pulse bg-muted" />

          <div className="mt-3 h-4 w-72 animate-pulse bg-muted" />
        </div>

        <div className="space-y-6">
          <div className="h-80 animate-pulse border border-border bg-muted/30" />

          <div className="h-64 animate-pulse border border-border bg-muted/30" />
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Error                                                                    */
  /* ------------------------------------------------------------------------ */

  if (isError || !user) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <UserRound className="size-8 text-muted-foreground/50" />

        <p className="mt-4 text-sm font-medium">Unable to load user</p>

        <p className="mt-1 text-xs text-muted-foreground">
          The user may no longer exist or could not be loaded.
        </p>

        <Link
          href="/users"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Users
        </Link>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <Link
          href={`/users/${user.id}`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to User
        </Link>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Users
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">Edit User</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the account information and permissions for{" "}
            <span className="font-medium text-foreground">{user.username}</span>
            .
          </p>
        </div>
      </div>

      {/* Form */}

      <EditUserForm key={`${user.id}-${user.updatedAt}`} user={user} />
    </div>
  );
};

export default EditUserPage;
