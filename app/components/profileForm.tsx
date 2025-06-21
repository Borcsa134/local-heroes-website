'use client';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { addToast } from '@heroui/react';
import React, { useActionState, useEffect } from 'react';

import { upsertUser } from './upsertUser';

interface Props {
  username: string;
  email: string;
  fullname: string;
}

export default function ProfileForm({ username, email, fullname }: Props) {
  const [state, formAction, pending] = useActionState(upsertUser, null);
  const [value, setValue] = React.useState(() => fullname);

  useEffect(() => {
    if (!pending && state) {
      addToast({ title: 'Sikeres mentés!', timeout: 3000, color: 'success' });
    }
    const formData = state?.formData;
    if (formData) {
      setValue(formData.get('fullname') as string);
    }
  }, [pending, state]);

  return (
    <Form className="w-full max-w-xs" action={formAction}>
      <Input
        isReadOnly
        errorMessage="Helytelen Discord felhasznaló"
        label="Discord felhasználó"
        labelPlacement="inside"
        name="username"
        placeholder="Discord felhasználó"
        type="text"
        variant="bordered"
        defaultValue={username}
      />
      <Input
        isReadOnly
        errorMessage="Helytelen email cím"
        label="Email"
        labelPlacement="inside"
        name="email"
        placeholder="Email cím"
        type="email"
        variant="bordered"
        defaultValue={email}
      />
      <Input
        isRequired
        errorMessage="Kérlek add meg a teljes neved"
        label="Teljes név"
        labelPlacement="inside"
        name="fullname"
        placeholder="Teljes név"
        type="text"
        value={value}
        onValueChange={setValue}
        defaultValue={fullname}
      />
      <Button type="submit" variant="bordered" isDisabled={pending}>
        Mentés
      </Button>
    </Form>
  );
}
