require 'test_helper'

class UserSessionsControllerTest < ActionController::TestCase
  fixtures :users
  
  test "should get new" do
    get :new
    assert_response :success
  end
  
  test "should create user session" do
    post :create, :user_session => { :login => "acoy", :password => "yay" }
    assert user_session = UserSession.find
    assert_equal users(:coy), user_session.user
    assert_redirected_to account_path
  end
  
  test "should destroy user session" do
    delete :destroy
    assert_nil UserSession.find
    assert_redirected_to new_user_session_path
  end
end