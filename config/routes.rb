Rails.application.routes.draw do

  root 'application#index'
  get '/:action(/:user_id)', to: "users#%{action}"
  
end
