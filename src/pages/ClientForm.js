import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createCliente, updateCliente, getClientes } from '../services/ClienteService';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';


const ClienteForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        const response = await getClientes();
        const cliente = response.find(c => c.id === Number(id));
        setValue('nome', cliente.nome);
        setValue('cpf', cliente.cpf);
        setValue('email', cliente.email);
      };
      fetchCliente();
    }
  }, [id, setValue]);


  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateCliente(id, data);
        Swal.fire('Sucesso!', 'Cliente atualizado com sucesso!', 'success');
      } else {
        await createCliente(data);
        Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso!', 'success');
      }
      navigate('/clientes');
    } catch (error) {
      Swal.fire('Erro!', 'Ocorreu um erro ao salvar os dados.', 'error');
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nome" {...register('nome', { required: true })} />
      <Input label="CPF" mask="999.999.999-99" {...register('cpf', { required: true })} />
      <Input label="Email" {...register('email', { required: true })} />
      <CustomButton type="submit">Salvar</CustomButton>
    </form>
  );
};


export default ClienteForm;