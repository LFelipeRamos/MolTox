import { useForm } from 'react-hook-form';
import CompoundNameInput from './CompoundNameInput';
import { useCompoundSearch } from '../contexts/CompoundSearchContext';

const exampleCompounds = [
  { name: 'Aspirina', query: 'aspirin' },
  { name: 'Ibuprofeno', query: 'ibuprofen' },
  { name: 'Paracetamol', query: 'acetaminophen' },
];

interface FormValues {
  nome: string;
}

function CompoundSearchForm() {
  const { buscarCompostos, carregando } = useCompoundSearch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(dados: FormValues) {
    buscarCompostos(dados.nome);
  }

  return (
    <section className="mb-4">
      <div className="card p-4 mx-auto" style={{ maxWidth: '480px' }}>
        <h2 className="h5 mb-3">Buscar compostos similares</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CompoundNameInput
            erro={errors.nome?.message}
            {...register('nome', {
              required: 'Informe o nome de um composto.',
              minLength: { value: 3, message: 'Nome muito curto.' },
            })}
          />

          <div className="d-flex flex-wrap gap-2 mb-3">
            {exampleCompounds.map((compound) => (
              <button
                key={compound.name}
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setValue('nome', compound.query, { shouldValidate: true })}
              >
                {compound.name}
              </button>
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={carregando}>
            {carregando ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CompoundSearchForm;