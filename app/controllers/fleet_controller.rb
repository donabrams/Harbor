class FleetController < ApplicationController
  before_filter :require_user
  helper :all
  def show
    @teacher = current_user.login
    render :layout => false
  end
end