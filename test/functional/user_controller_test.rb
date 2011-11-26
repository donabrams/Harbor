require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  fixtures :users
  
  test "should get new" do
    get :new
    assert_response :success
  end
  
  test "should create user" do
    assert_difference('User.count') do
      post :create, :user => { :login => "acoy", :password => "yay2", :password_confirmation => "yay2" }
    end
    assert_redirected_to account_path
  end
  
  test "should show user" do
    UserSession.create(users(:coy))
    get :show
    assert_response :success
  end

  test "should get edit DON" do
    UserSession.create(users(:coy))
    get :edit, :id => users(:coy).id
    assert_response :success
  end

  test "should update user" do
    UserSession.create(users(:coy))
    put :update, :id => users(:coy).id, :user => { }
    assert_redirected_to account_path
  end
end