const { ApolloError } = require('apollo-server');

module.exports = async (_, args, context) => {
  const user = await context.models.User.findOne({ email: args.email });

  if(user) {
    if(user.isLocked) {
      throw new ApolloError('Usuário bloqueado');
    } else {
      if(user.hasAttempts) {
        const match = await user.comparePassword(args.password);
        
        user.lock = 0;

        if(match) {
          user.attempts = 0;

          await user.save();

          return user;
        } else {
          user.attempts += 1;

          await user.save();

          throw new ApolloError('Senha inválida');
        }
      } else {
        user.attempts = 0;
        user.lock = Date.now();

        await user.save();

        throw new ApolloError('Usuário bloqueado');
      }
    }
  } else {
    throw new ApolloError('Usuário não encontrado');
  }
};