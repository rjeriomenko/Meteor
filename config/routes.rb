Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]

    resources :users, only: [:create, :show, :update, :destroy, :index] do
      get 'starred_tales', to: 'tales#index_by_user', on: :member
      resources :follows, only: [:create]
    end

    resources :follows, only: [:destroy, :index]
    get 'followed_users_tales', to: 'tales#index_by_follower'
    
    resources :tales, only: [:show, :create, :update, :destroy, :index] do
      resources :stars, only: [:create, :index]
      resources :comets, only: [:create, :index]
    end

    resources :comets, only: [:update, :destroy]

    resources :constellations, only: [:update, :destroy, :index]
    post 'constellations/create_user', to: 'constellations#create_user'
    post 'constellations/create_tale/:tale_id', to: 'constellations#create_tale'

  end
  
  get '*path', to: "static_pages#frontend_index"
end