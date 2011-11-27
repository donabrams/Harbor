require 'test_helper'

class FleetControllerTest < ActionController::TestCase
  fixtures :users
  
  test "should show the fleet for the teacher" do
    UserSession.create(users(:coy))
    get :show
    assert_response :success
    assert_equal "acoy", @controller.instance_eval{@teacher}
  end
end