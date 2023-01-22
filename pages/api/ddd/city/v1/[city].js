import app from '@/app';
import BaseError from '@/errors/BaseError';
import InternalError from '@/errors/InternalError';
import { getDddsData } from '@/services/ddd';

async function DddOfCity(request, response, next) {
  const nameCity = request.query.city;
  
  try {
    const allDddData = await getDddsData();

    const dddData = allDddData.filter(
      ({ city }) => city === nameCity.toUpperCase()
    );

    response.status(200);
    return response.json(dddData);
  } catch (error) {
    if (error instanceof BaseError) {
      return next(error);
    }

    throw new InternalError({
      message: 'Todos os serviços de DDD retornaram erro.',
      type: 'service_error',
    });
  }
}
export default app().get(DddOfCity);
