Rails.application.routes.draw do

  root 'application#index'

  # For security (for the moment) I'm only letting requests from localhost through
  get '/:action(/:user_id)', to: "users#%{action}"

  # get 'photos/:id', to: 'photos#show', defaults: { format: 'jpg' }, as: :show_photos
  # show_photos GET    /photos/:id(.:format)     photos#show {:format=>"jpg"}   --- maps to this

  # resources :users

  # resources :users do
  #   member do
  #     get 'short'
  #     post 'toggle'
  #   end

  #   collection do
  #     get 'sold'
  #   end
  # end

  # concern :searchable do
  #   post 'search'
  # end
  # resources :users, concern: :searchable
  
end
