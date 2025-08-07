import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import SectionItems from '@app/components/molecules/SectionItems';
import FieldInputPassword from '@app/components/organisms/fields/FieldInputPassword';
import TextComponent from '@app/components/atoms/text/TextComponent';

import { PASSWORD_REGEX } from '@app/config/constants';

import { IUpdateProfilePasswordFormData } from '@app/types';

type Props = {
  onSubmit?: (values: IUpdateProfilePasswordFormData) => void;
}

const ChangePasswordForm = (props: Props) => {
  const {
    control,
    // handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IUpdateProfilePasswordFormData>({
    // reValidateMode: 'onChange',
    mode: 'onChange',
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const newPassword = watch('new_password');

  const onSubmit = (data: IUpdateProfilePasswordFormData) => {
    if (props.onSubmit) {
      props.onSubmit(data);
    }
  };

  return (
    <SectionItems title="Cambiar contraseña">
      <Controller
        control={control}
        rules={{
          required: 'La contraseña actual es obligatoria.',
          minLength: { value: 6, message: 'Debe tener al menos 6 caracteres.' },
          pattern: {
            value: PASSWORD_REGEX,
            message: 'La contraseña debe cumplir con los requisitos.',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FieldInputPassword
            input
            type="password"
            placeholder="Contraseña actual"
            autoCapitalize="none"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="old_password"
      />
      {errors.old_password && (
        <TextComponent color="primary">{errors.old_password.message}</TextComponent>
      )}

      <Controller
        control={control}
        rules={{
          required: 'La nueva contraseña es obligatoria.',
          minLength: { value: 6, message: 'Debe tener al menos 6 caracteres.' },
          pattern: {
            value: PASSWORD_REGEX,
            message: 'La contraseña debe cumplir con los requisitos.',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FieldInputPassword
            input
            type="password"
            placeholder="Contraseña nueva"
            autoCapitalize="none"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="new_password"
      />
      {errors.new_password && (
        <TextComponent color="primary">{errors.new_password.message}</TextComponent>
      )}

      <Controller
        control={control}
        rules={{
          required: 'Debes confirmar la nueva contraseña.',
          validate: (value) =>
            value === newPassword || 'Las contraseñas no coinciden.',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FieldInputPassword
            input
            type="password"
            placeholder="Confirma tu contraseña nueva"
            autoCapitalize="none"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="confirm_new_password"
      />
      {errors.confirm_new_password && (
        <TextComponent color="primary">{errors.confirm_new_password.message}</TextComponent>
      )}
    </SectionItems>
  );
};

export default ChangePasswordForm;
