#!/usr/bin/env python3
"""Build the curated IT chunk catalogue.

Frequency is an editorial estimate of workplace usefulness, not corpus data.
Chunks are hand-curated; examples use varied, grammatical infinitive frames for
controlled variation. This file is the editable source for the stable IDs.
"""

import json
import re
from pathlib import Path

GROUPS = []


def group(topic, frequency, context, source):
    entries = [line.split("|", 1) for line in source.strip().splitlines() if line.strip()]
    assert len(entries) == 50, (topic, len(entries))
    assert all(len(entry) == 2 for entry in entries), topic
    GROUPS.append((topic, frequency, context, entries))


group("Yêu cầu hỗ trợ IT", 5, "buổi hướng dẫn nhận hỗ trợ IT", """
contact the help desk|liên hệ bộ phận hỗ trợ kỹ thuật
open a support ticket|tạo phiếu yêu cầu hỗ trợ
report a technical issue|báo một vấn đề kỹ thuật
describe the problem clearly|mô tả rõ vấn đề đang gặp
ask for technical support|nhờ hỗ trợ về kỹ thuật
explain what happened|giải thích sự việc đã xảy ra
share the error message|gửi nội dung thông báo lỗi
attach a screenshot|đính kèm ảnh chụp màn hình
provide your device details|cung cấp thông tin thiết bị của bạn
mention when it started|nêu thời điểm vấn đề bắt đầu
check the ticket status|kiểm tra trạng thái phiếu hỗ trợ
reply to the support team|trả lời đội hỗ trợ
follow up on a ticket|hỏi tiếp về tiến độ xử lý phiếu
request a callback|đề nghị bộ phận hỗ trợ gọi lại
schedule a support session|hẹn một buổi hỗ trợ
confirm your contact details|xác nhận thông tin liên hệ của bạn
explain the impact on your work|giải thích vấn đề ảnh hưởng công việc ra sao
include the asset number|ghi kèm mã quản lý tài sản
describe the steps you tried|mô tả các bước bạn đã thử
check the support hours|kiểm tra giờ làm việc của bộ phận hỗ trợ
find the right support channel|tìm đúng kênh yêu cầu hỗ trợ
send a screen recording|gửi bản quay màn hình
give permission for remote support|cho phép hỗ trợ từ xa
stay on the support call|tiếp tục ở trong cuộc gọi hỗ trợ
read out the error code|đọc thành tiếng mã lỗi
repeat the last step|làm lại bước vừa thực hiện
wait for the technician|chờ nhân viên kỹ thuật
confirm that it works|xác nhận rằng chức năng đã hoạt động
test it while we are connected|thử ngay khi hai bên vẫn đang kết nối
explain what you expected|giải thích kết quả bạn mong đợi
point out the affected feature|chỉ ra chức năng bị ảnh hưởng
check the self-service portal|xem cổng tự phục vụ hỗ trợ IT
look up a help article|tìm một bài hướng dẫn hỗ trợ
follow the troubleshooting guide|làm theo hướng dẫn xử lý sự cố
ask for a simpler explanation|nhờ giải thích dễ hiểu hơn
clarify the next step|làm rõ bước cần thực hiện tiếp
confirm the support appointment|xác nhận lịch hẹn hỗ trợ
reschedule the technician visit|đổi lịch nhân viên kỹ thuật đến hỗ trợ
provide an alternative contact|cung cấp một đầu mối liên hệ khác
update the ticket description|cập nhật phần mô tả phiếu hỗ trợ
add a note to the ticket|thêm ghi chú vào phiếu hỗ trợ
thank the technician for the help|cảm ơn nhân viên kỹ thuật đã hỗ trợ
rate the support experience|đánh giá trải nghiệm nhận hỗ trợ
reopen a support ticket|mở lại phiếu hỗ trợ đã đóng
withdraw a duplicate request|rút yêu cầu trùng lặp
check who is handling the ticket|xem ai đang xử lý phiếu hỗ trợ
request an on-site visit|yêu cầu đến hỗ trợ trực tiếp
share a suitable time slot|cho biết khung giờ phù hợp để hỗ trợ
keep the ticket number handy|giữ sẵn mã phiếu để tiện tra cứu
confirm that the issue is resolved|xác nhận sự cố đã được giải quyết
""")

group("Tài khoản và quyền truy cập", 5, "buổi hướng dẫn về tài khoản", """
sign in to your account|đăng nhập vào tài khoản của bạn
sign out of a shared computer|đăng xuất khỏi máy tính dùng chung
request access to a shared folder|xin quyền truy cập thư mục dùng chung
check your access level|kiểm tra mức quyền truy cập của bạn
create a user account|tạo tài khoản người dùng
activate your work account|kích hoạt tài khoản công việc của bạn
verify your email address|xác minh địa chỉ email của bạn
switch to your work profile|chuyển sang hồ sơ công việc của bạn
recover a locked account|khôi phục tài khoản bị khóa
ask the account owner|hỏi người sở hữu tài khoản
get approval for access|xin phê duyệt quyền truy cập
remove an inactive account|xóa tài khoản không còn hoạt động
extend temporary access|gia hạn quyền truy cập tạm thời
check the account expiry date|kiểm tra ngày hết hạn tài khoản
request a guest account|xin tài khoản khách
accept an account invitation|chấp nhận lời mời tạo hoặc tham gia tài khoản
use your company email address|dùng địa chỉ email công ty của bạn
correct your display name|sửa tên hiển thị của bạn
update your account information|cập nhật thông tin tài khoản của bạn
check whether your account is active|kiểm tra tài khoản của bạn còn hoạt động không
separate work and personal accounts|tách riêng tài khoản công việc và cá nhân
confirm your username|xác nhận tên đăng nhập của bạn
request access on behalf of a colleague|xin quyền truy cập thay cho đồng nghiệp
review the list of users|rà soát danh sách người dùng
identify the account administrator|xác định quản trị viên tài khoản
join the correct user group|tham gia đúng nhóm người dùng
leave an unused user group|rời nhóm người dùng không còn dùng
check your group membership|kiểm tra bạn thuộc những nhóm người dùng nào
grant read-only access|cấp quyền chỉ đọc
request permission to edit|xin quyền chỉnh sửa
limit access to authorized users|giới hạn truy cập cho người được phép
revoke access after departure|thu hồi quyền truy cập khi nhân viên nghỉ việc
restore your previous permissions|khôi phục các quyền trước đây của bạn
check for an access error|kiểm tra có lỗi truy cập không
confirm the account belongs to you|xác nhận tài khoản thuộc về bạn
resolve a sign-in problem|giải quyết vấn đề đăng nhập
link your employee record|liên kết hồ sơ nhân viên của bạn
check the new starter's access|kiểm tra quyền truy cập của nhân viên mới
transfer ownership of a resource|chuyển quyền sở hữu một tài nguyên
review external user access|rà soát quyền truy cập của người bên ngoài
submit an access justification|gửi lý do cần quyền truy cập
set an access expiry date|đặt ngày hết hạn quyền truy cập
check the approval history|kiểm tra lịch sử phê duyệt
remove an unnecessary permission|gỡ một quyền không cần thiết
report unexpected account activity|báo hoạt động tài khoản bất thường
confirm the correct sign-in page|xác nhận trang đăng nhập chính xác
use the account recovery form|sử dụng biểu mẫu khôi phục tài khoản
check for duplicate user accounts|kiểm tra tài khoản người dùng bị trùng
restore a disabled account|khôi phục tài khoản đã bị vô hiệu hóa
document the access change|ghi lại thay đổi quyền truy cập
""")

group("Mật khẩu và xác thực", 5, "buổi hướng dẫn bảo vệ tài khoản", """
reset your password|đặt lại mật khẩu của bạn
change an expired password|đổi mật khẩu đã hết hạn
enter your verification code|nhập mã xác minh của bạn
check your authentication app|kiểm tra ứng dụng xác thực của bạn
enable multi-factor authentication|bật xác thực nhiều yếu tố
save your recovery codes|lưu các mã khôi phục của bạn
use a password manager|dùng trình quản lý mật khẩu
choose a unique password|chọn mật khẩu riêng không dùng lại
verify your identity|xác minh danh tính của bạn
check your recovery email|kiểm tra email dùng để khôi phục
update your recovery phone number|cập nhật số điện thoại khôi phục của bạn
report an unexpected sign-in prompt|báo yêu cầu đăng nhập bất ngờ
approve a sign-in request|chấp thuận yêu cầu đăng nhập
deny an unfamiliar login request|từ chối yêu cầu đăng nhập không nhận ra
wait for a new verification code|chờ mã xác minh mới
request another verification email|yêu cầu gửi lại email xác minh
check the code expiry time|kiểm tra thời gian hết hạn của mã
register a security key|đăng ký khóa bảo mật
set up a passkey|thiết lập khóa truy cập không dùng mật khẩu
unlock your password vault|mở khóa kho mật khẩu của bạn
check whether Caps Lock is on|kiểm tra phím Caps Lock có đang bật không
type your password again|nhập lại mật khẩu của bạn
use the correct keyboard layout|dùng đúng bố cục bàn phím
recover access after losing your phone|khôi phục truy cập sau khi mất điện thoại
replace an old authentication device|thay thiết bị xác thực cũ
remove an outdated recovery method|gỡ phương thức khôi phục đã lỗi thời
confirm the password reset email|xác nhận email đặt lại mật khẩu
report a suspected password leak|báo nghi ngờ mật khẩu bị lộ
check the password requirements|kiểm tra yêu cầu đặt mật khẩu
avoid reusing old passwords|tránh dùng lại mật khẩu cũ
protect your recovery codes|bảo vệ các mã khôi phục của bạn
review your trusted devices|rà soát các thiết bị được tin cậy
remove a lost device from your account|gỡ thiết bị bị mất khỏi tài khoản
end an unfamiliar session|kết thúc phiên đăng nhập không nhận ra
check your recent sign-ins|kiểm tra các lần đăng nhập gần đây
report repeated account lockouts|báo tình trạng tài khoản liên tục bị khóa
confirm your second verification method|xác nhận phương thức xác minh thứ hai
use a backup authentication method|dùng phương thức xác thực dự phòng
check the time on your phone|kiểm tra giờ trên điện thoại của bạn
enroll in the company authentication system|đăng ký hệ thống xác thực của công ty
test your recovery process|thử quy trình khôi phục của bạn
report a missing verification message|báo không nhận được tin nhắn xác minh
check your saved login details|kiểm tra thông tin đăng nhập đã lưu
update an outdated saved password|cập nhật mật khẩu đã lưu nhưng không còn đúng
remove a saved password from a shared browser|gỡ mật khẩu lưu trong trình duyệt dùng chung
confirm the source of a login alert|xác nhận nguồn của cảnh báo đăng nhập
ask IT to review a blocked login|nhờ IT xem xét lượt đăng nhập bị chặn
protect your security key|giữ an toàn cho khóa bảo mật của bạn
report a broken authentication device|báo thiết bị xác thực bị hỏng
check the account recovery policy|kiểm tra chính sách khôi phục tài khoản
""")

group("Máy tính và điện thoại công việc", 5, "buổi hướng dẫn sử dụng thiết bị công việc", """
restart your computer|khởi động lại máy tính của bạn
charge your laptop|sạc máy tính xách tay của bạn
check the battery level|kiểm tra mức pin
connect the power adapter|kết nối bộ sạc
lock your screen|khóa màn hình của bạn
check the device settings|kiểm tra phần cài đặt thiết bị
adjust the screen brightness|điều chỉnh độ sáng màn hình
free up disk space|giải phóng dung lượng ổ đĩa
check the available memory|kiểm tra lượng bộ nhớ khả dụng
report a frozen screen|báo màn hình bị treo
close an unresponsive application|đóng ứng dụng không phản hồi
check the device temperature|kiểm tra nhiệt độ thiết bị
report a damaged laptop|báo máy tính xách tay bị hư hỏng
request a replacement charger|xin bộ sạc thay thế
check your storage usage|kiểm tra mức sử dụng bộ nhớ lưu trữ
turn on airplane mode|bật chế độ máy bay
turn off silent mode|tắt chế độ im lặng
adjust the notification settings|điều chỉnh cài đặt thông báo
check the operating system version|kiểm tra phiên bản hệ điều hành
look up the device model|tra cứu mẫu thiết bị
find the serial number|tìm số sê-ri
check the warranty status|kiểm tra tình trạng bảo hành
report a loose charging port|báo cổng sạc bị lỏng
inspect the power cable|kiểm tra dây nguồn
check for physical damage|kiểm tra hư hỏng bên ngoài
switch to battery power|chuyển sang dùng nguồn pin
connect to an external display|kết nối với màn hình ngoài
adjust the sleep settings|điều chỉnh cài đặt chế độ ngủ
wake the laptop from sleep|đánh thức máy tính khỏi chế độ ngủ
check the touchpad settings|kiểm tra cài đặt bàn di chuột
enable the on-screen keyboard|bật bàn phím trên màn hình
change the display language|đổi ngôn ngữ hiển thị
set the correct time zone|đặt đúng múi giờ
check the volume level|kiểm tra mức âm lượng
connect a wired headset|kết nối tai nghe có dây
pair a Bluetooth device|ghép nối thiết bị Bluetooth
remove an unused Bluetooth pairing|gỡ kết nối ghép đôi Bluetooth không dùng
check the camera permissions|kiểm tra quyền sử dụng camera
review location permissions|rà soát quyền truy cập vị trí
report a swollen battery|báo pin bị phồng
request a loaner laptop|xin mượn máy tính xách tay tạm thời
prepare your device for repair|chuẩn bị thiết bị để gửi sửa chữa
describe an unusual fan noise|mô tả tiếng quạt bất thường
check whether the device is charging|kiểm tra thiết bị có đang sạc không
report a broken screen hinge|báo bản lề màn hình bị hỏng
check the remaining battery life|kiểm tra thời gian dùng pin còn lại
find an accessible display setting|tìm cài đặt hiển thị hỗ trợ khả năng tiếp cận
increase the text size|tăng cỡ chữ
report unexpected shutdowns|báo tình trạng máy tự tắt bất ngờ
confirm the device is ready to use|xác nhận thiết bị đã sẵn sàng sử dụng
""")

group("Máy in và thiết bị ngoại vi", 4, "buổi hướng dẫn thiết bị văn phòng", """
connect a second monitor|kết nối màn hình thứ hai
select the correct audio output|chọn đúng thiết bị phát âm thanh
test your microphone|kiểm tra micrô của bạn
check the webcam connection|kiểm tra kết nối webcam
adjust the monitor height|điều chỉnh chiều cao màn hình
change the screen resolution|đổi độ phân giải màn hình
extend your desktop|mở rộng vùng màn hình làm việc
mirror your laptop screen|hiển thị cùng nội dung màn hình máy tính
check the display cable|kiểm tra cáp màn hình
connect a docking station|kết nối đế mở rộng cổng
check the USB connection|kiểm tra kết nối USB
replace a faulty mouse|thay chuột bị lỗi
report a stuck keyboard key|báo phím bàn phím bị kẹt
test a different USB port|thử cổng USB khác
pair a wireless keyboard|ghép nối bàn phím không dây
check the headset battery|kiểm tra pin tai nghe
select the default printer|chọn máy in mặc định
send a test page|gửi lệnh in trang thử
check the print queue|kiểm tra hàng đợi in
cancel a print job|hủy một lệnh in
report a paper jam|báo kẹt giấy trong máy in
check the paper tray|kiểm tra khay giấy
replace an empty toner cartridge|thay hộp mực đã hết
choose double-sided printing|chọn in hai mặt
select the right paper size|chọn đúng khổ giấy
check the printer connection|kiểm tra kết nối máy in
collect your printed documents|lấy tài liệu đã in của bạn
use secure print release|dùng chức năng xác nhận trước khi máy in xuất tài liệu
scan a document to email|quét tài liệu rồi gửi qua email
check the scanner settings|kiểm tra cài đặt máy quét
adjust the scan quality|điều chỉnh chất lượng bản quét
report a missing printer|báo không tìm thấy máy in trong danh sách
check the printer's network address|kiểm tra địa chỉ mạng của máy in
find the nearest shared printer|tìm máy in dùng chung gần nhất
report faded printouts|báo bản in bị mờ
check the projector input|kiểm tra nguồn tín hiệu vào máy chiếu
connect the meeting room display|kết nối màn hình phòng họp
adjust the speaker volume|điều chỉnh âm lượng loa
report audio feedback|báo tiếng hú hoặc vọng âm
check the conference room microphone|kiểm tra micrô phòng họp
test the room's video equipment|thử thiết bị hình ảnh của phòng
reserve a presentation adapter|đặt mượn bộ chuyển đổi cổng trình chiếu
check cable compatibility|kiểm tra cáp có tương thích không
label a shared charging cable|dán nhãn dây sạc dùng chung
return borrowed equipment|trả thiết bị đã mượn
report a missing adapter|báo thất lạc bộ chuyển đổi
inspect a damaged connector|kiểm tra đầu nối bị hỏng
check the docking station power supply|kiểm tra nguồn điện của đế mở rộng
report a flickering monitor|báo màn hình nhấp nháy
request an ergonomic keyboard|xin bàn phím hỗ trợ tư thế làm việc
""")

group("Mạng và kết nối Internet", 5, "buổi hướng dẫn kết nối mạng", """
connect to the office Wi-Fi|kết nối Wi-Fi văn phòng
check your internet connection|kiểm tra kết nối Internet của bạn
report a slow connection|báo kết nối chậm
switch to a wired connection|chuyển sang kết nối có dây
check the network name|kiểm tra tên mạng
enter the Wi-Fi password|nhập mật khẩu Wi-Fi
find the guest network|tìm mạng dành cho khách
check the signal strength|kiểm tra độ mạnh tín hiệu
move closer to the access point|di chuyển gần điểm phát mạng hơn
report a dropped connection|báo kết nối bị ngắt
check whether other websites load|kiểm tra các trang web khác có tải được không
test the connection speed|kiểm tra tốc độ kết nối
connect an Ethernet cable|cắm cáp Ethernet
check the network cable|kiểm tra dây mạng
report a network outage|báo mất kết nối mạng diện rộng
check the Wi-Fi status|kiểm tra trạng thái Wi-Fi
confirm the correct network|xác nhận đúng mạng cần dùng
forget an outdated Wi-Fi network|xóa thông tin mạng Wi-Fi cũ đã lưu
reconnect to the wireless network|kết nối lại với mạng không dây
check the network adapter|kiểm tra bộ điều hợp mạng
report an unstable wireless signal|báo tín hiệu không dây không ổn định
check for a network notice|kiểm tra thông báo về mạng
compare wired and wireless speeds|so sánh tốc độ mạng có dây và không dây
check the connection icon|kiểm tra biểu tượng kết nối
describe the connection delay|mô tả độ trễ khi kết nối
report a connection timeout|báo lỗi quá thời gian chờ kết nối
check the local network settings|kiểm tra cài đặt mạng nội bộ
confirm your assigned IP address|xác nhận địa chỉ IP được cấp
check the default gateway|kiểm tra cổng mạng mặc định
record the network error|ghi lại lỗi mạng
ask about scheduled network maintenance|hỏi về lịch bảo trì mạng
check the network status page|xem trang trạng thái mạng
report a weak signal area|báo khu vực sóng yếu
identify the affected floor|xác định tầng bị ảnh hưởng
check a different network outlet|kiểm tra ổ cắm mạng khác
label a network cable|dán nhãn dây mạng
check the guest access duration|kiểm tra thời hạn truy cập mạng khách
request temporary network access|xin quyền truy cập mạng tạm thời
check the captive portal page|kiểm tra trang xác nhận truy cập mạng
report a blocked website|báo trang web bị chặn
ask IT to review a website block|nhờ IT xem xét việc chặn trang web
check the proxy settings|kiểm tra cài đặt máy chủ proxy
confirm the network has recovered|xác nhận mạng đã phục hồi
compare connection results|so sánh kết quả kiểm tra kết nối
record the time of the disconnect|ghi lại thời điểm mất kết nối
check for wireless interference|kiểm tra nhiễu tín hiệu không dây
report frequent reconnections|báo tình trạng phải kết nối lại liên tục
test connectivity from another desk|thử kết nối từ bàn làm việc khác
check the network access policy|kiểm tra chính sách truy cập mạng
confirm the office network is available|xác nhận mạng văn phòng đang hoạt động
""")

group("Làm việc từ xa và VPN", 4, "buổi hướng dẫn truy cập từ xa", """
connect to the company VPN|kết nối VPN công ty
check your VPN status|kiểm tra trạng thái VPN của bạn
report a VPN connection error|báo lỗi kết nối VPN
disconnect from the VPN|ngắt kết nối VPN
select the approved VPN profile|chọn hồ sơ VPN được phê duyệt
check the remote access instructions|xem hướng dẫn truy cập từ xa
request remote desktop access|xin quyền truy cập máy tính từ xa
start a remote desktop session|bắt đầu phiên điều khiển máy tính từ xa
end a remote support session|kết thúc phiên hỗ trợ từ xa
confirm the remote computer name|xác nhận tên máy tính ở xa
check your home connection|kiểm tra kết nối mạng ở nhà
report a remote session freeze|báo phiên truy cập từ xa bị treo
reconnect after a session timeout|kết nối lại sau khi phiên hết thời gian chờ
check the VPN client version|kiểm tra phiên bản ứng dụng VPN
ask IT about remote access requirements|hỏi IT về yêu cầu truy cập từ xa
confirm your device is compliant|xác nhận thiết bị đáp ứng quy định
report a remote access denial|báo việc bị từ chối truy cập từ xa
check whether the VPN is required|kiểm tra có cần sử dụng VPN không
use an approved remote access tool|dùng công cụ truy cập từ xa được phê duyệt
verify the support technician's identity|xác minh danh tính nhân viên hỗ trợ
share your screen with IT|chia sẻ màn hình với bộ phận IT
pause screen sharing|tạm dừng chia sẻ màn hình
choose which screen to share|chọn màn hình cần chia sẻ
close private windows before sharing|đóng cửa sổ riêng tư trước khi chia sẻ
confirm you can see the remote desktop|xác nhận bạn thấy màn hình máy tính từ xa
describe the remote connection lag|mô tả độ trễ kết nối từ xa
check the remote session limits|kiểm tra giới hạn của phiên truy cập từ xa
request a longer remote session|xin kéo dài phiên truy cập từ xa
report an unexpected remote connection|báo kết nối từ xa không mong đợi
check the approved connection method|kiểm tra phương thức kết nối được phê duyệt
confirm the remote service is running|xác nhận dịch vụ truy cập từ xa đang chạy
document a remote support session|ghi lại nội dung phiên hỗ trợ từ xa
check the remote clipboard policy|kiểm tra quy định sao chép qua phiên truy cập từ xa
request secure access while traveling|xin quyền truy cập an toàn khi đi công tác
check the travel device requirements|kiểm tra yêu cầu thiết bị khi đi công tác
report a lost work device while abroad|báo mất thiết bị công việc khi ở nước ngoài
check the public Wi-Fi policy|kiểm tra quy định sử dụng Wi-Fi công cộng
use a company-approved hotspot|dùng điểm phát mạng được công ty cho phép
check your mobile data allowance|kiểm tra dung lượng dữ liệu di động được cấp
report a roaming connection problem|báo vấn đề kết nối khi chuyển vùng
confirm the VPN gateway address|xác nhận địa chỉ cổng VPN
check the VPN maintenance schedule|kiểm tra lịch bảo trì VPN
compare remote and office access|so sánh truy cập từ xa và tại văn phòng
report a missing remote desktop shortcut|báo thiếu lối tắt truy cập máy tính từ xa
check the remote display resolution|kiểm tra độ phân giải màn hình từ xa
adjust the remote audio settings|điều chỉnh cài đặt âm thanh phiên từ xa
test a remote connection before traveling|thử kết nối từ xa trước khi đi công tác
confirm the remote session has ended|xác nhận phiên truy cập từ xa đã kết thúc
report repeated VPN disconnections|báo VPN liên tục mất kết nối
ask IT to review the remote access log|nhờ IT kiểm tra nhật ký truy cập từ xa
""")

group("Email và họp trực tuyến", 5, "buổi hướng dẫn công cụ liên lạc", """
check your spam folder|kiểm tra thư mục thư rác
report a missing email|báo không nhận được email
check your mailbox storage|kiểm tra dung lượng hộp thư của bạn
open an email attachment|mở tệp đính kèm email
check the attachment size|kiểm tra kích thước tệp đính kèm
report a delivery failure|báo lỗi gửi thư không thành công
check the recipient's address|kiểm tra địa chỉ người nhận
set up an automatic reply|thiết lập trả lời tự động
update your email signature|cập nhật chữ ký email của bạn
request a shared mailbox|xin hộp thư dùng chung
check shared mailbox permissions|kiểm tra quyền đối với hộp thư dùng chung
add a shared calendar|thêm lịch dùng chung
recover a deleted email|khôi phục email đã xóa
check the email sync status|kiểm tra trạng thái đồng bộ email
report delayed email delivery|báo thư được chuyển đến chậm
search for an archived message|tìm tin nhắn đã lưu trữ
check your inbox rules|kiểm tra quy tắc xử lý hộp thư đến
report an unexpected email redirect|báo email bị chuyển hướng bất thường
join the online meeting|tham gia cuộc họp trực tuyến
check the meeting link|kiểm tra đường dẫn cuộc họp
test your audio before the call|thử âm thanh trước cuộc gọi
select the correct microphone|chọn đúng micrô
mute your microphone|tắt tiếng micrô của bạn
turn on your camera|bật camera của bạn
check the camera preview|kiểm tra hình ảnh xem trước của camera
blur your background|làm mờ hậu cảnh của bạn
report an echo during the call|báo tiếng vọng trong cuộc gọi
switch to phone audio|chuyển sang nghe nói qua điện thoại
rejoin the meeting|vào lại cuộc họp
check whether you are muted|kiểm tra micrô của bạn có đang tắt không
share a specific application window|chia sẻ một cửa sổ ứng dụng cụ thể
stop sharing your screen|ngừng chia sẻ màn hình của bạn
enable live captions|bật phụ đề trực tiếp
check the meeting recording permissions|kiểm tra quyền ghi lại cuộc họp
report poor video quality|báo chất lượng hình ảnh kém
check the meeting room speaker|kiểm tra loa phòng họp
admit a guest from the waiting room|cho khách vào từ phòng chờ
check the participant limit|kiểm tra giới hạn số người tham gia
report a missing meeting invitation|báo không nhận được lời mời họp
check the meeting time zone|kiểm tra múi giờ của cuộc họp
connect your calendar to the meeting tool|kết nối lịch với công cụ họp
report a chat notification problem|báo vấn đề thông báo tin nhắn
adjust your availability status|điều chỉnh trạng thái sẵn sàng của bạn
check the message retention policy|kiểm tra quy định lưu giữ tin nhắn
request access to a team channel|xin quyền truy cập kênh của nhóm
leave an inactive chat group|rời nhóm trò chuyện không còn hoạt động
report a suspicious meeting invitation|báo lời mời họp đáng ngờ
check the recording location|kiểm tra nơi lưu bản ghi cuộc họp
confirm the meeting equipment works|xác nhận thiết bị họp hoạt động
report a calendar sync problem|báo vấn đề đồng bộ lịch
""")

group("Tệp và lưu trữ đám mây", 5, "buổi hướng dẫn quản lý tệp", """
upload a file to the shared drive|tải tệp lên ổ lưu trữ dùng chung
download a copy of the document|tải một bản sao tài liệu xuống
check the file permissions|kiểm tra quyền đối với tệp
share a read-only link|chia sẻ liên kết chỉ cho phép đọc
request access to a document|xin quyền truy cập tài liệu
check the file sync status|kiểm tra trạng thái đồng bộ tệp
restore an earlier file version|khôi phục phiên bản tệp trước đó
recover a deleted file|khôi phục tệp đã xóa
check the recycle bin|kiểm tra thùng rác chứa tệp đã xóa
rename a shared folder|đổi tên thư mục dùng chung
move a file to the correct folder|chuyển tệp vào đúng thư mục
check the available storage space|kiểm tra dung lượng lưu trữ còn trống
report a sync conflict|báo xung đột đồng bộ
save a local copy|lưu một bản sao trên thiết bị
mark a file for offline access|đánh dấu tệp để dùng khi không có mạng
check who owns the file|kiểm tra ai sở hữu tệp
change the sharing settings|thay đổi cài đặt chia sẻ
remove an external sharing link|gỡ liên kết chia sẻ ra bên ngoài
set a sharing link expiry date|đặt ngày hết hạn liên kết chia sẻ
check the folder structure|kiểm tra cách sắp xếp thư mục
find the latest version|tìm phiên bản mới nhất
report a missing shared folder|báo thư mục dùng chung bị thiếu
check the file name extension|kiểm tra phần đuôi tên tệp
open the file with the correct application|mở tệp bằng đúng ứng dụng
report an unsupported file format|báo định dạng tệp không được hỗ trợ
check the upload limit|kiểm tra giới hạn tải lên
compress a large attachment|nén tệp đính kèm dung lượng lớn
check whether a file is encrypted|kiểm tra tệp có được mã hóa không
request permission to download|xin quyền tải xuống
check a document's version history|xem lịch sử phiên bản tài liệu
resolve a duplicate file name|xử lý tên tệp bị trùng
report a file that will not open|báo tệp không mở được
check the file modification date|kiểm tra ngày chỉnh sửa tệp
confirm a file has finished uploading|xác nhận tệp đã tải lên xong
pause a large file sync|tạm dừng đồng bộ tệp lớn
resume file synchronization|tiếp tục đồng bộ tệp
check the cloud storage quota|kiểm tra hạn mức lưu trữ đám mây
request additional storage|xin thêm dung lượng lưu trữ
archive an inactive shared folder|lưu trữ thư mục dùng chung không còn sử dụng
check the file retention period|kiểm tra thời hạn lưu giữ tệp
transfer a file through an approved channel|chuyển tệp qua kênh được phê duyệt
verify the file recipient|xác minh người nhận tệp
check the external sharing policy|kiểm tra chính sách chia sẻ ra bên ngoài
report a broken file link|báo liên kết tệp không hoạt động
copy the path to a shared folder|sao chép đường dẫn đến thư mục dùng chung
check whether a file is locked|kiểm tra tệp có đang bị khóa không
ask the owner to release the file lock|nhờ chủ sở hữu bỏ khóa tệp
confirm the shared drive is connected|xác nhận đã kết nối ổ lưu trữ dùng chung
check the offline file status|kiểm tra trạng thái tệp dùng ngoại tuyến
report unexpected changes to a shared file|báo thay đổi bất thường ở tệp dùng chung
""")

group("Quản lý dịch vụ IT", 4, "buổi hướng dẫn quản lý dịch vụ IT", """
assign a ticket to the right team|giao phiếu hỗ trợ cho đúng nhóm
set the ticket priority|đặt mức ưu tiên cho phiếu
check the service level agreement|kiểm tra thỏa thuận mức dịch vụ
track the response time|theo dõi thời gian phản hồi
review the ticket backlog|rà soát số phiếu còn tồn đọng
categorize an incoming request|phân loại yêu cầu mới nhận
link related support tickets|liên kết các phiếu hỗ trợ có liên quan
merge duplicate tickets|gộp các phiếu hỗ trợ trùng lặp
escalate a ticket to second-line support|chuyển phiếu lên tuyến hỗ trợ cấp hai
record the resolution details|ghi lại chi tiết cách giải quyết
close the ticket with a summary|đóng phiếu kèm bản tóm tắt
confirm the user's availability|xác nhận thời gian người dùng có thể tham gia
check the ticket's response deadline|kiểm tra hạn phản hồi của phiếu
route a request to the service owner|chuyển yêu cầu đến người phụ trách dịch vụ
update the service catalogue|cập nhật danh mục dịch vụ
define the scope of support|xác định phạm vi hỗ trợ
check the support entitlement|kiểm tra quyền được nhận hỗ trợ
review a recurring support issue|rà soát vấn đề hỗ trợ lặp lại
create a knowledge base article|tạo bài hướng dẫn trong kho kiến thức
update an outdated help article|cập nhật bài hướng dẫn lỗi thời
link a ticket to a known issue|liên kết phiếu với vấn đề đã biết
capture the user's feedback|ghi nhận phản hồi của người dùng
review the support handover|rà soát nội dung bàn giao hỗ trợ
check the on-call schedule|kiểm tra lịch trực hỗ trợ
confirm the escalation contact|xác nhận người liên hệ khi cần chuyển cấp
record a service request|ghi nhận yêu cầu dịch vụ
separate an incident from a request|phân biệt sự cố với yêu cầu dịch vụ
track a vendor support case|theo dõi hồ sơ hỗ trợ từ nhà cung cấp
check the vendor's response|kiểm tra phản hồi của nhà cung cấp
prepare the monthly service report|chuẩn bị báo cáo dịch vụ hằng tháng
review customer satisfaction scores|rà soát điểm hài lòng của khách hàng
identify a gap in the support guide|xác định phần thiếu trong hướng dẫn hỗ trợ
check the request approval workflow|kiểm tra luồng phê duyệt yêu cầu
record the business justification|ghi lại lý do phục vụ hoạt động kinh doanh
confirm the service owner|xác nhận người chịu trách nhiệm dịch vụ
review a support queue|rà soát hàng đợi yêu cầu hỗ trợ
balance the technician workload|cân đối khối lượng việc của nhân viên kỹ thuật
add a resolution code|thêm mã phân loại cách giải quyết
record time spent on a ticket|ghi lại thời gian đã xử lý một phiếu
identify tickets awaiting user input|tìm các phiếu đang chờ người dùng trả lời
send a ticket status notification|gửi thông báo trạng thái phiếu
check the auto-assignment rules|kiểm tra quy tắc tự động phân công
review a missed response target|rà soát trường hợp trễ mục tiêu phản hồi
confirm the request has been fulfilled|xác nhận yêu cầu đã được đáp ứng
document a service exception|ghi lại trường hợp ngoại lệ của dịch vụ
review the escalation path|rà soát trình tự chuyển cấp hỗ trợ
check the support coverage|kiểm tra phạm vi và thời gian có hỗ trợ
plan a support shift handover|lên kế hoạch bàn giao ca hỗ trợ
review unresolved high-priority tickets|rà soát phiếu ưu tiên cao chưa giải quyết
measure the average resolution time|đo thời gian giải quyết trung bình
""")

group("Chẩn đoán và theo dõi hệ thống", 4, "buổi hướng dẫn chẩn đoán sự cố", """
reproduce the reported issue|tái hiện vấn đề được báo
check the system logs|kiểm tra nhật ký hệ thống
capture the full error message|ghi lại đầy đủ thông báo lỗi
compare the results before and after|so sánh kết quả trước và sau
check for recent changes|kiểm tra những thay đổi gần đây
isolate the affected component|xác định riêng thành phần bị ảnh hưởng
test one change at a time|thử từng thay đổi một
record the troubleshooting steps|ghi lại các bước xử lý sự cố
check whether the issue is intermittent|kiểm tra vấn đề có lúc xảy ra lúc không không
identify a pattern in the failures|tìm quy luật trong các lần lỗi
check the system uptime|kiểm tra thời gian hệ thống chạy liên tục
review the performance graph|xem lại biểu đồ hiệu năng
monitor CPU usage|theo dõi mức sử dụng CPU
check memory consumption|kiểm tra mức tiêu thụ bộ nhớ
review disk activity|xem lại hoạt động đọc ghi ổ đĩa
check the error timestamp|kiểm tra thời điểm ghi nhận lỗi
compare the affected devices|so sánh những thiết bị bị ảnh hưởng
test with a known working device|thử bằng thiết bị đã biết là hoạt động tốt
collect diagnostic information|thu thập thông tin chẩn đoán
run an approved diagnostic tool|chạy công cụ chẩn đoán được phê duyệt
check the event viewer|xem công cụ hiển thị sự kiện hệ thống
identify the first failed step|xác định bước đầu tiên bị lỗi
check the service health dashboard|xem bảng theo dõi tình trạng dịch vụ
review a monitoring alert|rà soát cảnh báo giám sát
check the alert threshold|kiểm tra ngưỡng phát cảnh báo
compare normal and peak usage|so sánh mức sử dụng bình thường và cao điểm
check the monitoring time range|kiểm tra khoảng thời gian đang theo dõi
verify the reported symptoms|xác minh các triệu chứng được báo
rule out a local device problem|loại trừ khả năng lỗi ở thiết bị cục bộ
check the system clock accuracy|kiểm tra độ chính xác đồng hồ hệ thống
record the diagnostic tool version|ghi lại phiên bản công cụ chẩn đoán
review the connectivity test results|rà soát kết quả thử kết nối
check for repeated error entries|kiểm tra các dòng lỗi lặp lại
correlate alerts with user reports|đối chiếu cảnh báo với báo cáo của người dùng
check the monitoring agent status|kiểm tra trạng thái chương trình giám sát
investigate a sudden resource spike|điều tra mức sử dụng tài nguyên tăng đột ngột
check the available disk capacity|kiểm tra dung lượng ổ đĩa còn khả dụng
review the device health report|xem báo cáo tình trạng thiết bị
verify that the monitoring data is current|xác minh dữ liệu giám sát còn cập nhật
check for gaps in the logs|kiểm tra khoảng trống trong nhật ký
note the conditions that trigger the issue|ghi lại điều kiện làm vấn đề xuất hiện
compare results across locations|so sánh kết quả giữa các địa điểm
confirm a suspected root cause|xác nhận nguyên nhân gốc đang nghi ngờ
document an unsuccessful test|ghi lại phép thử không cho kết quả mong đợi
check the health of a dependent service|kiểm tra tình trạng dịch vụ phụ thuộc
validate a temporary workaround|kiểm chứng cách xử lý tạm thời
observe the system after recovery|theo dõi hệ thống sau khi phục hồi
check whether the alert has cleared|kiểm tra cảnh báo đã hết chưa
share the diagnostic findings|chia sẻ kết quả chẩn đoán
recommend the next diagnostic step|đề xuất bước chẩn đoán tiếp theo
""")

group("Sự cố và tính sẵn sàng", 3, "buổi diễn tập xử lý sự cố", """
declare a major incident|công bố sự cố nghiêm trọng
assess the impact of an outage|đánh giá ảnh hưởng của việc ngừng dịch vụ
identify the affected users|xác định người dùng bị ảnh hưởng
check the incident timeline|kiểm tra diễn biến sự cố theo thời gian
notify the on-call engineer|thông báo cho kỹ sư đang trực
join the incident bridge|tham gia kênh họp xử lý sự cố
assign an incident coordinator|chỉ định người điều phối sự cố
publish a service status update|đăng thông báo tình trạng dịch vụ
confirm the incident severity|xác nhận mức nghiêm trọng của sự cố
record the start of the outage|ghi lại thời điểm bắt đầu ngừng dịch vụ
estimate the affected user count|ước tính số người dùng bị ảnh hưởng
check for a wider service disruption|kiểm tra gián đoạn dịch vụ trên phạm vi rộng hơn
communicate a temporary workaround|thông báo cách xử lý tạm thời
confirm the next update time|xác nhận thời điểm cập nhật tiếp theo
keep the status page current|giữ trang trạng thái luôn được cập nhật
separate confirmed facts from assumptions|tách thông tin đã xác nhận khỏi giả định
track the recovery actions|theo dõi các bước khôi phục
coordinate with the network team|phối hợp với đội mạng
request additional technical support|đề nghị thêm hỗ trợ kỹ thuật
record an incident decision|ghi lại quyết định trong xử lý sự cố
check the fallback service|kiểm tra dịch vụ dự phòng
confirm the recovery criteria|xác nhận tiêu chí được coi là đã phục hồi
validate service restoration|kiểm chứng dịch vụ đã được khôi phục
monitor for recurring failures|theo dõi lỗi có tái diễn không
confirm that users can reconnect|xác nhận người dùng có thể kết nối lại
announce the end of the outage|thông báo việc ngừng dịch vụ đã kết thúc
write an incident summary|viết tóm tắt sự cố
preserve the incident evidence|giữ lại bằng chứng về sự cố
review the response timeline|rà soát diễn biến quá trình ứng phó
identify contributing factors|xác định những yếu tố góp phần gây sự cố
document the root cause|ghi lại nguyên nhân gốc
schedule a post-incident review|lên lịch đánh giá sau sự cố
track the follow-up actions|theo dõi các việc cần làm sau sự cố
review the communication gaps|rà soát những thiếu sót khi truyền đạt thông tin
update the incident response guide|cập nhật hướng dẫn ứng phó sự cố
check the outage duration|kiểm tra thời lượng ngừng dịch vụ
compare the recovery time with the target|so sánh thời gian phục hồi với mục tiêu
review the business impact|rà soát ảnh hưởng đến hoạt động kinh doanh
confirm ownership of corrective actions|xác nhận người phụ trách hành động khắc phục
record a near-miss incident|ghi nhận tình huống suýt gây ra sự cố
check the emergency contact list|kiểm tra danh sách liên hệ khẩn cấp
handover an active incident|bàn giao một sự cố đang được xử lý
prepare an outage notification|soạn thông báo ngừng dịch vụ
check for related incidents|kiểm tra sự cố có liên quan
review the major incident procedure|rà soát quy trình xử lý sự cố nghiêm trọng
confirm the service is stable|xác nhận dịch vụ đã ổn định
record the recovery completion time|ghi lại thời điểm hoàn tất khôi phục
review the effectiveness of the workaround|đánh giá hiệu quả của cách xử lý tạm thời
close the incident after verification|đóng hồ sơ sự cố sau khi xác minh
share lessons from the incident|chia sẻ bài học rút ra từ sự cố
""")

group("Nhận thức an toàn thông tin", 4, "buổi đào tạo an toàn thông tin", """
report a suspicious email|báo email đáng ngờ
check the sender's address|kiểm tra địa chỉ người gửi
spot a phishing attempt|nhận ra hành vi giả mạo để lừa lấy thông tin
verify an unexpected request|xác minh yêu cầu bất ngờ
protect confidential information|bảo vệ thông tin bí mật
report a lost access badge|báo mất thẻ ra vào
lock your desk drawer|khóa ngăn kéo bàn làm việc của bạn
follow the clean desk policy|tuân theo quy định giữ bàn làm việc không lộ tài liệu
check a link before opening it|kiểm tra liên kết trước khi mở
report an unknown USB device|báo thiết bị USB không rõ nguồn gốc
verify the caller's identity|xác minh danh tính người gọi
report a suspected security incident|báo sự cố an ninh thông tin đáng ngờ
complete security awareness training|hoàn thành đào tạo nhận thức bảo mật
protect personal data|bảo vệ dữ liệu cá nhân
check the information classification|kiểm tra mức phân loại thông tin
use an approved file-sharing service|dùng dịch vụ chia sẻ tệp được phê duyệt
report accidental data exposure|báo vô tình để lộ dữ liệu
confirm the intended recipient|xác nhận đúng người nhận dự kiến
report an unauthorized visitor|báo người đến không được phép
follow the visitor registration process|tuân theo quy trình đăng ký khách
check the acceptable use policy|kiểm tra chính sách sử dụng được chấp nhận
report a suspicious browser warning|báo cảnh báo trình duyệt đáng ngờ
recognize a fake login page|nhận ra trang đăng nhập giả mạo
confirm a request through a trusted channel|xác nhận yêu cầu qua kênh đáng tin cậy
report a fraudulent support call|báo cuộc gọi giả danh hỗ trợ
check the data handling guidelines|xem hướng dẫn xử lý dữ liệu
keep sensitive information out of screenshots|tránh để thông tin nhạy cảm xuất hiện trong ảnh màn hình
report a misdirected email|báo email gửi nhầm người
review an application's permissions|rà soát quyền của ứng dụng
report an unexpected software installation|báo phần mềm được cài bất ngờ
check the approved software list|kiểm tra danh sách phần mềm được phép
avoid sharing account credentials|tránh chia sẻ thông tin đăng nhập
report a missing company phone|báo điện thoại công ty bị mất
follow the lost device procedure|làm theo quy trình khi mất thiết bị
check the document disposal rules|kiểm tra quy định tiêu hủy tài liệu
use a secure disposal bin|dùng thùng thu gom tài liệu cần hủy an toàn
protect your screen from public view|che màn hình khỏi tầm nhìn của người xung quanh
verify a payment change request|xác minh yêu cầu thay đổi thông tin thanh toán
recognize a social engineering attempt|nhận ra hành vi thao túng người để lấy thông tin
check the security reporting channel|kiểm tra kênh báo cáo vấn đề bảo mật
report a suspicious QR code|báo mã QR đáng ngờ
check the source of a download|kiểm tra nguồn tải tệp
report an unexpected browser extension|báo tiện ích trình duyệt xuất hiện bất ngờ
review the remote working security rules|rà soát quy tắc bảo mật khi làm việc từ xa
ask before sharing restricted information|hỏi trước khi chia sẻ thông tin bị hạn chế
report a possible data breach|báo khả năng xảy ra rò rỉ dữ liệu
check the approved storage location|kiểm tra vị trí lưu trữ được cho phép
verify a colleague's unusual request|xác minh yêu cầu bất thường của đồng nghiệp
keep your access badge visible|đeo thẻ ra vào ở vị trí dễ thấy
follow the security team's guidance|làm theo hướng dẫn của đội bảo mật
""")

group("Vòng đời thiết bị và tài sản IT", 3, "buổi hướng dẫn quản lý tài sản IT", """
register a new company device|đăng ký thiết bị công ty mới
update the asset inventory|cập nhật danh mục tài sản
assign a laptop to an employee|cấp máy tính xách tay cho nhân viên
record the device's serial number|ghi lại số sê-ri thiết bị
check the equipment return date|kiểm tra ngày phải trả thiết bị
prepare a laptop for a new starter|chuẩn bị máy tính cho nhân viên mới
confirm the equipment handover|xác nhận việc bàn giao thiết bị
record the assigned accessories|ghi lại phụ kiện được cấp
check the device management status|kiểm tra trạng thái quản lý thiết bị
enroll a device in company management|đăng ký thiết bị vào hệ thống quản lý công ty
review the device compliance report|rà soát báo cáo tuân thủ của thiết bị
schedule an operating system update|lên lịch cập nhật hệ điều hành
check the update installation status|kiểm tra trạng thái cài đặt bản cập nhật
confirm the restart window|xác nhận khung giờ khởi động lại máy
report an update failure|báo lỗi cập nhật
check the approved update schedule|kiểm tra lịch cập nhật đã được phê duyệt
track devices awaiting updates|theo dõi thiết bị đang chờ cập nhật
verify the installed security patches|xác minh các bản vá bảo mật đã cài
check the device encryption status|kiểm tra trạng thái mã hóa thiết bị
record the warranty expiry date|ghi lại ngày hết hạn bảo hành
request a hardware repair quote|xin báo giá sửa chữa phần cứng
arrange a warranty repair|sắp xếp sửa chữa theo bảo hành
track a device sent for repair|theo dõi thiết bị đã gửi sửa
inspect returned equipment|kiểm tra thiết bị được trả lại
confirm all accessories are included|xác nhận đã đủ mọi phụ kiện
remove a retired device from inventory|gỡ thiết bị đã ngừng dùng khỏi danh mục
record the asset disposal approval|ghi lại phê duyệt thanh lý tài sản
arrange certified data destruction|sắp xếp tiêu hủy dữ liệu có chứng nhận
retain the disposal certificate|giữ lại chứng nhận tiêu hủy
check the hardware refresh cycle|kiểm tra chu kỳ thay mới phần cứng
plan replacement of aging devices|lập kế hoạch thay thiết bị cũ
review the spare equipment stock|rà soát lượng thiết bị dự phòng
reserve a replacement laptop|giữ sẵn máy tính xách tay thay thế
track a loaned device|theo dõi thiết bị cho mượn
confirm the asset's current location|xác nhận vị trí hiện tại của tài sản
update the device owner record|cập nhật thông tin người quản lý thiết bị
check the software license allocation|kiểm tra việc phân bổ giấy phép phần mềm
reclaim an unused software license|thu hồi giấy phép phần mềm không còn dùng
record an approved device exception|ghi lại ngoại lệ thiết bị đã được duyệt
review the mobile device policy|rà soát quy định thiết bị di động
check the device retirement checklist|kiểm tra danh sách việc cần làm khi ngừng dùng thiết bị
confirm the data transfer is complete|xác nhận chuyển dữ liệu đã hoàn tất
report an unregistered work device|báo thiết bị làm việc chưa đăng ký
check the equipment purchase record|kiểm tra hồ sơ mua thiết bị
verify the asset tag|xác minh nhãn mã tài sản
resolve an inventory mismatch|xử lý sai lệch trong danh mục tài sản
schedule a physical asset check|lên lịch kiểm kê tài sản thực tế
document a device transfer|ghi lại việc chuyển giao thiết bị
check the replacement device specification|kiểm tra cấu hình thiết bị thay thế
confirm receipt of new equipment|xác nhận đã nhận thiết bị mới
""")

group("Máy chủ và vận hành đám mây", 2, "buổi hướng dẫn vận hành hạ tầng", """
check the server status|kiểm tra trạng thái máy chủ
review the cloud service dashboard|xem bảng theo dõi dịch vụ đám mây
monitor server resource usage|theo dõi mức sử dụng tài nguyên máy chủ
check the virtual machine capacity|kiểm tra tài nguyên của máy ảo
request an additional virtual machine|xin thêm máy ảo
review the approved server configuration|rà soát cấu hình máy chủ đã được phê duyệt
check the operating system support dates|kiểm tra thời hạn hỗ trợ hệ điều hành
schedule a server maintenance window|lên lịch bảo trì máy chủ
notify users of planned maintenance|thông báo người dùng về bảo trì theo kế hoạch
confirm the maintenance approval|xác nhận phê duyệt bảo trì
check the server's power status|kiểm tra trạng thái nguồn điện máy chủ
review the data center temperature|xem lại nhiệt độ trung tâm dữ liệu
check the rack location|kiểm tra vị trí trong tủ máy chủ
record the server asset details|ghi lại thông tin tài sản máy chủ
check the storage volume capacity|kiểm tra dung lượng vùng lưu trữ
monitor cloud storage growth|theo dõi mức tăng dung lượng lưu trữ đám mây
review the cloud cost report|rà soát báo cáo chi phí đám mây
identify unused cloud resources|xác định tài nguyên đám mây không sử dụng
check the resource ownership tags|kiểm tra nhãn người phụ trách tài nguyên
confirm the approved hosting region|xác nhận khu vực đặt dịch vụ đã được duyệt
review the resource quota|rà soát hạn mức tài nguyên
request a quota increase|xin tăng hạn mức tài nguyên
check the instance health status|kiểm tra tình trạng phiên bản máy chủ đang chạy
review the scaling history|xem lịch sử tăng giảm tài nguyên
check the load balancer health|kiểm tra tình trạng bộ cân bằng tải
monitor the request rate|theo dõi tốc độ nhận yêu cầu
review the storage performance metrics|xem chỉ số hiệu năng lưu trữ
check the disk latency|kiểm tra độ trễ ổ đĩa
verify the maintenance completion|xác minh bảo trì đã hoàn tất
review the infrastructure change record|rà soát hồ sơ thay đổi hạ tầng
check the server access audit|xem hồ sơ kiểm toán truy cập máy chủ
confirm the service dependency map|xác nhận sơ đồ quan hệ phụ thuộc dịch vụ
document the server's purpose|ghi lại mục đích sử dụng máy chủ
check the cloud provider's service notice|xem thông báo dịch vụ của nhà cung cấp đám mây
review the capacity forecast|rà soát dự báo nhu cầu tài nguyên
track a pending infrastructure request|theo dõi yêu cầu hạ tầng đang chờ
confirm the resource naming convention|xác nhận quy tắc đặt tên tài nguyên
check the scheduled shutdown policy|kiểm tra chính sách tắt máy theo lịch
review the server retirement plan|rà soát kế hoạch ngừng sử dụng máy chủ
check the data center access approval|kiểm tra phê duyệt vào trung tâm dữ liệu
verify the power redundancy status|xác minh trạng thái dự phòng nguồn điện
review the cooling system alert|rà soát cảnh báo hệ thống làm mát
record a hardware health warning|ghi lại cảnh báo tình trạng phần cứng
check the hypervisor health report|kiểm tra báo cáo tình trạng nền tảng ảo hóa
review the virtual machine placement|rà soát cách phân bổ máy ảo trên máy chủ
check the cloud billing alert|kiểm tra cảnh báo thanh toán đám mây
document an infrastructure dependency|ghi lại một quan hệ phụ thuộc hạ tầng
confirm the server monitoring coverage|xác nhận phạm vi giám sát máy chủ
review the managed service agreement|rà soát hợp đồng dịch vụ được quản lý
check the infrastructure support contact|kiểm tra đầu mối hỗ trợ hạ tầng
""")

group("Sao lưu và phục hồi dữ liệu", 3, "buổi diễn tập khôi phục dữ liệu", """
check the backup status|kiểm tra trạng thái sao lưu
confirm the last successful backup|xác nhận lần sao lưu thành công gần nhất
report a failed backup|báo sao lưu thất bại
review the backup schedule|rà soát lịch sao lưu
request a file restoration|yêu cầu khôi phục tệp
identify the required recovery point|xác định thời điểm dữ liệu cần khôi phục
check the backup retention period|kiểm tra thời gian giữ bản sao lưu
verify a restored file|xác minh tệp được khôi phục
compare the restored data with the original|so sánh dữ liệu phục hồi với dữ liệu gốc
check the backup storage capacity|kiểm tra dung lượng nơi chứa bản sao lưu
review the backup job history|xem lịch sử tác vụ sao lưu
confirm the backup includes the shared drive|xác nhận bản sao lưu có gồm ổ dùng chung
document a recovery request|ghi lại yêu cầu khôi phục
check the restoration approval|kiểm tra phê duyệt việc khôi phục
record the recovery completion status|ghi lại trạng thái hoàn thành phục hồi
test the backup recovery process|thử quy trình khôi phục từ bản sao lưu
schedule a recovery exercise|lên lịch diễn tập phục hồi
check the disaster recovery plan|kiểm tra kế hoạch phục hồi sau thảm họa
review the recovery time objective|rà soát mục tiêu thời gian phục hồi
review the recovery point objective|rà soát mục tiêu về mức mất dữ liệu cho phép
verify backup access permissions|xác minh quyền truy cập bản sao lưu
check the backup encryption status|kiểm tra trạng thái mã hóa bản sao lưu
confirm the off-site backup location|xác nhận vị trí sao lưu ngoài cơ sở
review the backup failure alert|rà soát cảnh báo sao lưu thất bại
check the backup agent status|kiểm tra trạng thái chương trình sao lưu
identify data excluded from backup|xác định dữ liệu không nằm trong phạm vi sao lưu
confirm the data owner's approval|xác nhận phê duyệt của chủ sở hữu dữ liệu
restore data to an approved location|khôi phục dữ liệu vào vị trí được cho phép
check for missing restored files|kiểm tra tệp còn thiếu sau phục hồi
record the backup verification results|ghi lại kết quả kiểm chứng bản sao lưu
review the data retention requirements|rà soát yêu cầu lưu giữ dữ liệu
check the archive retrieval process|kiểm tra quy trình lấy dữ liệu đã lưu trữ
request access to archived records|xin truy cập hồ sơ đã đưa vào kho lưu trữ
confirm the archive search criteria|xác nhận tiêu chí tìm kiếm trong kho lưu trữ
check the data export format|kiểm tra định dạng xuất dữ liệu
verify the exported record count|xác minh số bản ghi đã xuất
report an incomplete data transfer|báo chuyển dữ liệu chưa đầy đủ
compare source and destination totals|so sánh tổng số ở nguồn và đích
check the transfer completion log|kiểm tra nhật ký hoàn tất chuyển dữ liệu
document the data migration outcome|ghi lại kết quả chuyển dữ liệu sang hệ thống khác
verify the file integrity check|xác minh kết quả kiểm tra tính toàn vẹn tệp
check the backup service agreement|kiểm tra thỏa thuận dịch vụ sao lưu
review the recovery test findings|rà soát phát hiện từ lần thử phục hồi
confirm the recovery team contacts|xác nhận thông tin liên hệ đội phục hồi
record the recovery dependencies|ghi lại các yếu tố phụ thuộc khi phục hồi
check the backup job duration|kiểm tra thời lượng tác vụ sao lưu
investigate a missed backup window|tìm hiểu lần sao lưu không chạy đúng khung giờ
review the restore request queue|rà soát hàng đợi yêu cầu phục hồi
confirm that the restored data is usable|xác nhận dữ liệu phục hồi có thể sử dụng
update the recovery procedure|cập nhật quy trình phục hồi
""")

group("Hạ tầng mạng và bảo mật chuyên sâu", 1, "buổi đào tạo vận hành mạng và bảo mật", """
review the firewall change request|rà soát yêu cầu thay đổi tường lửa
check the certificate expiry date|kiểm tra ngày hết hạn chứng chỉ số
review the DNS resolution results|xem kết quả phân giải DNS
check the DHCP lease status|kiểm tra trạng thái cấp phát địa chỉ DHCP
verify the network segmentation plan|xác minh kế hoạch phân chia vùng mạng
review the network routing table|rà soát bảng định tuyến mạng
check the packet loss rate|kiểm tra tỷ lệ mất gói tin
monitor the network latency|theo dõi độ trễ mạng
review the bandwidth utilization|rà soát mức sử dụng băng thông
check the switch port status|kiểm tra trạng thái cổng bộ chuyển mạch
verify the VLAN assignment|xác minh việc gán mạng LAN ảo
review the network topology diagram|rà soát sơ đồ cấu trúc mạng
check the DNS record ownership|kiểm tra người phụ trách bản ghi DNS
confirm the certificate renewal owner|xác nhận người phụ trách gia hạn chứng chỉ
review a privileged access request|rà soát yêu cầu truy cập đặc quyền
check the privileged session audit|xem nhật ký kiểm toán phiên truy cập đặc quyền
review the service account permissions|rà soát quyền tài khoản dịch vụ
check the secret rotation schedule|kiểm tra lịch luân chuyển thông tin xác thực bí mật
verify the key management ownership|xác minh người phụ trách quản lý khóa
review the endpoint protection alert|rà soát cảnh báo bảo vệ thiết bị đầu cuối
check the vulnerability scan scope|kiểm tra phạm vi quét lỗ hổng
review the vulnerability assessment report|rà soát báo cáo đánh giá lỗ hổng
confirm the remediation owner|xác nhận người chịu trách nhiệm khắc phục
track an approved remediation plan|theo dõi kế hoạch khắc phục đã phê duyệt
check the patch exception expiry|kiểm tra ngày hết hạn ngoại lệ áp dụng bản vá
review the security monitoring coverage|rà soát phạm vi giám sát bảo mật
correlate security events across systems|đối chiếu sự kiện bảo mật giữa các hệ thống
check the log retention settings|kiểm tra cài đặt thời gian giữ nhật ký
verify the audit trail completeness|xác minh nhật ký kiểm toán đầy đủ
review the data loss prevention alert|rà soát cảnh báo ngăn ngừa thất thoát dữ liệu
check the access review evidence|kiểm tra bằng chứng rà soát quyền truy cập
confirm the compliance exception approval|xác nhận phê duyệt ngoại lệ tuân thủ
review the disaster recovery failover test|rà soát phép thử chuyển sang hệ thống dự phòng
check the replication lag|kiểm tra độ trễ sao chép dữ liệu
verify the secondary site's readiness|xác minh cơ sở dự phòng đã sẵn sàng
review the failback procedure|rà soát quy trình chuyển về hệ thống chính
check the high-availability configuration|kiểm tra cấu hình duy trì tính sẵn sàng cao
review the redundancy test results|xem kết quả thử hệ thống dự phòng
confirm the emergency change authorization|xác nhận cho phép thay đổi khẩn cấp
check the incident evidence retention|kiểm tra việc lưu giữ bằng chứng sự cố
review the network access control policy|rà soát chính sách kiểm soát truy cập mạng
verify the device posture assessment|xác minh đánh giá mức đáp ứng bảo mật của thiết bị
check the identity provider health|kiểm tra tình trạng hệ thống cung cấp danh tính
review the federation trust configuration|rà soát cấu hình tin cậy liên kết danh tính
check the single sign-on audit logs|kiểm tra nhật ký kiểm toán đăng nhập một lần
verify the certificate trust chain|xác minh chuỗi tin cậy của chứng chỉ
review the secure web gateway alert|rà soát cảnh báo cổng truy cập web an toàn
check the domain registration expiry|kiểm tra thời hạn đăng ký tên miền
review the network change rollback plan|rà soát kế hoạch hoàn tác thay đổi mạng
confirm the security incident handover|xác nhận bàn giao sự cố bảo mật
""")


GENERAL_GROUPS = []


def everyday(topic, frequency, source):
    entries = [line.split("|") for line in source.strip().splitlines() if line.strip()]
    assert len(entries) == 50, (topic, len(entries))
    assert all(len(entry) == 3 for entry in entries), topic
    GENERAL_GROUPS.append((topic, frequency, entries))


everyday("Lên kế hoạch và chuẩn bị chuyến đi", 5, """
plan a trip|lên kế hoạch cho chuyến đi|We want to plan a trip to the coast next month.
book a flight|đặt vé máy bay|I need to book a flight for Friday morning.
make a reservation|đặt chỗ trước|You can make a reservation on the hotel's website.
check the travel dates|kiểm tra ngày đi và về|Let's check the travel dates before we pay.
pack your bags|xếp hành lý của bạn|You should pack your bags tonight because we leave early.
travel light|mang ít hành lý khi đi du lịch|I prefer to travel light on short trips.
take a day trip|đi chơi và về trong ngày|We could take a day trip to the nearby island.
stay for a few nights|ở lại vài đêm|We hope to stay for a few nights in the old town.
compare ticket prices|so sánh giá vé|I always compare ticket prices before I choose a flight.
check the booking details|kiểm tra chi tiết đặt chỗ|Please check the booking details in your confirmation email.
confirm your reservation|xác nhận việc đặt chỗ của bạn|The hotel will call to confirm your reservation tomorrow.
change your travel dates|đổi ngày đi và về của bạn|You may need to change your travel dates if the flight is full.
cancel a booking|hủy đặt chỗ|I had to cancel a booking because the train was canceled.
ask about the cancellation policy|hỏi về quy định hủy đặt chỗ|Remember to ask about the cancellation policy before paying.
check the weather forecast|xem dự báo thời tiết|Let's check the weather forecast before our boat trip.
choose a place to stay|chọn nơi lưu trú|We still need to choose a place to stay near the station.
look for a direct flight|tìm chuyến bay thẳng|I will look for a direct flight to save time.
avoid the peak season|tránh mùa du lịch cao điểm|We try to avoid the peak season because hotels cost more.
set a travel budget|đặt ngân sách cho chuyến đi|Let's set a travel budget before we book anything.
buy travel insurance|mua bảo hiểm du lịch|I plan to buy travel insurance before my holiday.
check your passport expiry date|kiểm tra ngày hết hạn hộ chiếu|Remember to check your passport expiry date well before the trip.
apply for a visa|xin thị thực|My friend needs to apply for a visa for that trip.
check the entry requirements|kiểm tra yêu cầu nhập cảnh|We should check the entry requirements before choosing our flights.
print your booking confirmation|in xác nhận đặt chỗ|You can print your booking confirmation at the hotel desk.
save an offline map|lưu bản đồ để dùng khi không có mạng|I want to save an offline map before we leave the hotel.
make a packing list|lập danh sách đồ cần mang|I always make a packing list for longer trips.
leave room in your suitcase|để chừa chỗ trong va-li|You should leave room in your suitcase for gifts.
bring a travel adapter|mang bộ chuyển đổi ổ cắm du lịch|Don't forget to bring a travel adapter for your charger.
check the baggage allowance|kiểm tra hạn mức hành lý|I need to check the baggage allowance before packing.
arrange an airport transfer|sắp xếp xe đưa đón sân bay|The hotel can arrange an airport transfer for us.
share your itinerary|chia sẻ lịch trình chuyến đi|Please share your itinerary with the person meeting you.
leave enough travel time|chừa đủ thời gian di chuyển|We should leave enough travel time between the two stations.
book well in advance|đặt trước từ sớm|You need to book well in advance for the holiday weekend.
keep your documents together|giữ giấy tờ ở cùng một chỗ|A small folder can help you keep your documents together.
check the local time|kiểm tra giờ địa phương|Remember to check the local time before calling the hotel.
choose a flexible ticket|chọn vé có thể thay đổi lịch|I would rather choose a flexible ticket this time.
ask about hidden fees|hỏi về các khoản phí chưa thể hiện rõ|It is useful to ask about hidden fees before booking.
split the travel costs|chia nhau chi phí chuyến đi|The three of us agreed to split the travel costs.
join a guided tour|tham gia chuyến tham quan có hướng dẫn|We could join a guided tour of the old city.
book a local guide|thuê hướng dẫn viên địa phương|We want to book a local guide for the mountain walk.
check the opening hours|kiểm tra giờ mở cửa|Let's check the opening hours before visiting the museum.
buy tickets online|mua vé trực tuyến|You can buy tickets online to avoid the queue.
reserve a time slot|đặt trước khung giờ tham quan|We need to reserve a time slot for the gallery.
find a luggage storage service|tìm dịch vụ giữ hành lý|Let's find a luggage storage service near the station.
keep a copy of your passport|giữ một bản sao hộ chiếu|You may want to keep a copy of your passport with your travel records.
check the exchange rate|kiểm tra tỷ giá|I usually check the exchange rate before changing money.
buy a local SIM card|mua thẻ SIM địa phương|We can buy a local SIM card after we arrive.
activate a travel data plan|kích hoạt gói dữ liệu khi đi du lịch|I need to activate a travel data plan before using my phone abroad.
allow for unexpected delays|tính thêm thời gian cho sự chậm trễ bất ngờ|We should allow for unexpected delays on the way to the airport.
make the most of your stay|tận dụng tốt thời gian lưu trú|A local map can help you make the most of your stay.
""")

everyday("Xe buýt, tàu và phương tiện công cộng", 5, """
catch a bus|bắt xe buýt|I need to catch a bus to the city center.
take the train|đi bằng tàu|We can take the train instead of driving.
get on the bus|lên xe buýt|You can get on the bus at the next stop.
get off at the next stop|xuống ở điểm dừng tiếp theo|We need to get off at the next stop.
change trains|đổi tàu|You have to change trains at Central Station.
miss the last train|lỡ chuyến tàu cuối cùng|I don't want to miss the last train tonight.
check the timetable|xem lịch chạy|Let's check the timetable before leaving the café.
buy a return ticket|mua vé khứ hồi|I would like to buy a return ticket to Oxford.
buy a single ticket|mua vé một chiều|You can buy a single ticket from the machine.
top up your travel card|nạp tiền vào thẻ đi lại|You need to top up your travel card before boarding.
tap your card|chạm thẻ vào máy đọc|Please tap your card when you enter the station.
wait at the bus stop|chờ ở điểm dừng xe buýt|We can wait at the bus stop across the street.
find the right platform|tìm đúng sân ga|We have ten minutes to find the right platform.
check the departure board|xem bảng thông tin khởi hành|Let's check the departure board for our train.
ask which line to take|hỏi nên đi tuyến nào|You can ask which line to take at the information desk.
follow the station signs|đi theo biển chỉ dẫn trong ga|Just follow the station signs to the metro entrance.
validate your ticket|xác nhận vé bằng máy hoặc tại điểm kiểm tra|Remember to validate your ticket before boarding this tram.
show your ticket to the inspector|đưa vé cho nhân viên kiểm tra|You may need to show your ticket to the inspector.
reserve a seat|đặt trước chỗ ngồi|I want to reserve a seat by the window.
stand behind the yellow line|đứng phía sau vạch vàng|Passengers must stand behind the yellow line.
let passengers get off first|để hành khách xuống trước|Please let passengers get off first before you board.
move down the carriage|di chuyển vào sâu trong toa|Could you move down the carriage so others can get on?
give up your seat|nhường chỗ ngồi của bạn|You can give up your seat to someone who needs it more.
hold on to the handrail|bám tay vịn|Please hold on to the handrail while the bus is moving.
check the route map|xem sơ đồ tuyến|I need to check the route map to find our stop.
ask for a day pass|hỏi mua vé dùng trong một ngày|You can ask for a day pass at the ticket office.
avoid rush hour|tránh giờ cao điểm|We should avoid rush hour if we have heavy bags.
wait for the next service|chờ chuyến tiếp theo|The train is full, so we will wait for the next service.
check for service disruptions|kiểm tra thông tin gián đoạn dịch vụ|I always check for service disruptions before my commute.
find a step-free entrance|tìm lối vào không phải đi bậc thang|We need to find a step-free entrance for the suitcase.
use the pedestrian crossing|sử dụng vạch hoặc lối qua đường cho người đi bộ|Please use the pedestrian crossing to reach the bus stop.
take the replacement bus|đi xe buýt thay thế|We have to take the replacement bus while the line is closed.
request a stop|báo muốn xuống xe|Press the button to request a stop.
check the fare zones|kiểm tra các vùng tính cước|We should check the fare zones before buying our tickets.
keep your ticket until the exit|giữ vé cho đến khi ra khỏi ga|You need to keep your ticket until the exit.
ask about a student discount|hỏi về giảm giá cho sinh viên|You can ask about a student discount at the ticket counter.
check the last departure time|kiểm tra giờ khởi hành chuyến cuối|Let's check the last departure time before dinner.
find the ticket machine|tìm máy bán vé|Can you help me find the ticket machine?
report a faulty ticket gate|báo cổng soát vé bị lỗi|I need to report a faulty ticket gate to the station staff.
ask the driver for directions|hỏi người lái xe chỉ đường|You can ask the driver for directions to the hospital stop.
board at the front|lên xe bằng cửa trước|Passengers should board at the front on this bus.
exit through the rear door|xuống xe bằng cửa sau|Please exit through the rear door at the next stop.
store your bag on the luggage rack|đặt túi lên giá hành lý|You can store your bag on the luggage rack above your seat.
check the carriage number|kiểm tra số toa tàu|We need to check the carriage number before boarding.
listen for station announcements|chú ý nghe thông báo ở ga|Please listen for station announcements about the platform change.
request assistance at the station|yêu cầu hỗ trợ ở nhà ga|You can request assistance at the station information desk.
take a ferry across the river|đi phà qua sông|We can take a ferry across the river this afternoon.
check the ferry departure point|kiểm tra bến phà khởi hành|Let's check the ferry departure point on the map.
buy a weekly travel pass|mua vé đi lại dùng trong một tuần|I plan to buy a weekly travel pass for my visit.
check whether the ticket is valid|kiểm tra vé còn dùng được không|The station agent can check whether the ticket is valid.
""")

everyday("Chỉ đường, taxi và đi đường bộ", 5, """
ask for directions|hỏi đường|Let's ask for directions at the corner shop.
turn left at the traffic lights|rẽ trái ở đèn giao thông|You need to turn left at the traffic lights.
turn right at the next street|rẽ phải ở đường tiếp theo|We should turn right at the next street.
go straight ahead|đi thẳng phía trước|You can go straight ahead until you see the bank.
cross the road|băng qua đường|We need to cross the road to reach the museum.
walk past the station|đi bộ qua khỏi nhà ga|You should walk past the station and look for a blue sign.
take the second exit|đi theo lối ra thứ hai|At the roundabout, take the second exit.
follow the signs to the center|theo biển chỉ dẫn đến trung tâm|We can follow the signs to the center from here.
look for a landmark|tìm một địa điểm dễ nhận biết|Let's look for a landmark before checking the map again.
check where you are|kiểm tra vị trí hiện tại của bạn|The map can help you check where you are.
find your way back|tìm đường quay về|Can you find your way back to the hotel?
take a shortcut|đi đường tắt|We can take a shortcut through the park.
walk around the block|đi bộ một vòng quanh khu nhà|We need to walk around the block to find the entrance.
head toward the river|đi về phía con sông|Let's head toward the river and then turn left.
stay on this road|tiếp tục đi trên đường này|You should stay on this road for another kilometer.
look out for the entrance|chú ý tìm lối vào|Please look out for the entrance on the right.
call a taxi|gọi taxi|The receptionist can call a taxi for us.
book a ride|đặt chuyến xe|I need to book a ride to the station.
check the license plate|kiểm tra biển số xe|Please check the license plate before you get in.
confirm the pickup location|xác nhận điểm đón|We should confirm the pickup location with the driver.
share your location with the driver|gửi vị trí của bạn cho tài xế|You can share your location with the driver through the app.
ask for an estimated fare|hỏi giá cước dự kiến|I want to ask for an estimated fare before the trip.
ask the driver to wait|nhờ tài xế chờ|Could you ask the driver to wait for two minutes?
get in the car|lên xe ô tô|We can get in the car once the driver confirms our names.
fasten your seat belt|thắt dây an toàn của bạn|Please fasten your seat belt before we leave.
ask to be dropped off nearby|nhờ cho xuống ở gần đó|You can ask to be dropped off nearby if the street is closed.
pay by the meter|trả tiền theo đồng hồ tính cước|We agreed to pay by the meter for the taxi ride.
ask for a taxi receipt|xin biên lai taxi|I need to ask for a taxi receipt for my expenses.
report a lost item in a taxi|báo đồ bỏ quên trên taxi|You can report a lost item in a taxi through the app.
rent a car|thuê ô tô|We might rent a car for the weekend.
check the rental agreement|kiểm tra hợp đồng thuê xe|Please check the rental agreement before signing it.
show your driving license|xuất trình giấy phép lái xe|You will need to show your driving license at the rental desk.
inspect the car for damage|kiểm tra xe có hư hỏng không|Let's inspect the car for damage before we drive away.
check the fuel level|kiểm tra mức nhiên liệu|Remember to check the fuel level before the long drive.
fill up the tank|đổ đầy bình nhiên liệu|We need to fill up the tank before returning the car.
find a parking space|tìm chỗ đỗ xe|It is difficult to find a parking space near the market.
pay for parking|trả tiền đỗ xe|You can pay for parking at the machine by the exit.
check the parking restrictions|kiểm tra quy định hạn chế đỗ xe|Let's check the parking restrictions before leaving the car.
follow the diversion signs|theo biển chỉ đường thay thế|We have to follow the diversion signs because the bridge is closed.
avoid the toll road|tránh đường có thu phí|We can avoid the toll road if we leave earlier.
pay the road toll|trả phí đường bộ|The driver stopped to pay the road toll.
stop at a rest area|dừng ở trạm nghỉ|Let's stop at a rest area before continuing.
pull over safely|tấp xe vào chỗ an toàn|The driver needs to pull over safely before checking the map.
check the road conditions|kiểm tra tình trạng đường|We should check the road conditions before heading into the hills.
return the car on time|trả xe đúng giờ|We need to return the car on time to avoid an extra charge.
find a charging station|tìm trạm sạc xe|We should find a charging station near the hotel.
rent a bicycle|thuê xe đạp|You can rent a bicycle beside the park entrance.
check the bike brakes|kiểm tra phanh xe đạp|Please check the bike brakes before you set off.
follow the cycle route|đi theo tuyến dành cho xe đạp|We can follow the cycle route along the river.
lock the bike securely|khóa xe đạp chắc chắn|Remember to lock the bike securely outside the café.
""")

everyday("Sân bay và chuyến bay", 4, """
check in for your flight|làm thủ tục cho chuyến bay|You can check in for your flight online.
drop off your checked baggage|gửi hành lý ký gửi|You need to drop off your checked baggage before going to security.
show your boarding pass|xuất trình thẻ lên máy bay|Please show your boarding pass at the gate.
go through security|qua khu kiểm tra an ninh|We need to go through security before finding our gate.
find your departure gate|tìm cửa ra máy bay của bạn|You can find your departure gate on the screen.
check the gate number|kiểm tra số cửa lên máy bay|Let's check the gate number again before we sit down.
wait in the departure lounge|chờ ở phòng chờ khởi hành|We can wait in the departure lounge until boarding starts.
board the plane|lên máy bay|Families with young children can board the plane first.
find your seat|tìm chỗ ngồi của bạn|The flight attendant can help you find your seat.
put your bag under the seat|đặt túi dưới ghế|Please put your bag under the seat in front of you.
close the overhead locker|đóng ngăn hành lý phía trên|The flight attendant asked me to close the overhead locker.
ask for an aisle seat|xin chỗ ngồi cạnh lối đi|I would like to ask for an aisle seat.
request a window seat|xin chỗ ngồi cạnh cửa sổ|You can request a window seat when you check in.
check the boarding time|kiểm tra giờ bắt đầu lên máy bay|Remember to check the boarding time on your pass.
listen for your boarding group|chờ nghe gọi nhóm lên máy bay của bạn|Please listen for your boarding group before joining the queue.
check for a gate change|kiểm tra việc đổi cửa ra máy bay|We should check for a gate change on the departure board.
ask about a flight delay|hỏi về việc chuyến bay bị chậm|You can ask about a flight delay at the airline desk.
rebook a canceled flight|đặt lại chuyến bay đã bị hủy|The airline agent can help us rebook a canceled flight.
make a connecting flight|kịp chuyến bay nối chuyến|We only have an hour to make a connecting flight.
ask where to transfer|hỏi nơi làm thủ tục nối chuyến|Let's ask where to transfer after we land.
follow the arrivals signs|theo biển chỉ dẫn đến khu đến|You should follow the arrivals signs after leaving the plane.
go through passport control|qua khu kiểm tra hộ chiếu|We need to go through passport control before collecting our bags.
collect your luggage|nhận hành lý của bạn|You can collect your luggage at carousel five.
check the baggage carousel number|kiểm tra số băng chuyền hành lý|Let's check the baggage carousel number on the screen.
report missing baggage|báo thất lạc hành lý|You should report missing baggage at the airline desk.
describe your suitcase|mô tả va-li của bạn|The agent asked you to describe your suitcase.
keep your baggage receipt|giữ phiếu nhận hành lý|Remember to keep your baggage receipt until your bag arrives.
fill in a baggage claim form|điền mẫu khai báo hành lý|The agent helped me fill in a baggage claim form.
ask about baggage delivery|hỏi việc giao hành lý về sau|I need to ask about baggage delivery to my hotel.
declare goods at customs|khai báo hàng hóa ở hải quan|You may need to declare goods at customs.
check the customs allowance|kiểm tra hạn mức hàng hóa được phép qua hải quan|We should check the customs allowance before buying gifts.
find the airport shuttle|tìm xe đưa đón sân bay|The information desk can help you find the airport shuttle.
exchange money at the airport|đổi tiền ở sân bay|We might exchange money at the airport for the bus fare.
find the arrivals meeting point|tìm điểm hẹn ở khu đến|Let's find the arrivals meeting point before calling our driver.
request special assistance|yêu cầu hỗ trợ đặc biệt|You can request special assistance when booking your flight.
ask for a baggage trolley|hỏi lấy xe đẩy hành lý|I need to ask for a baggage trolley for these suitcases.
check the hand luggage limit|kiểm tra hạn mức hành lý xách tay|Please check the hand luggage limit before packing this bag.
weigh your suitcase|cân va-li của bạn|You can weigh your suitcase near the check-in desks.
pay an excess baggage fee|trả phí hành lý vượt hạn mức|I had to pay an excess baggage fee for the extra bag.
check whether a meal is included|kiểm tra vé có bao gồm suất ăn không|You can check whether a meal is included in the booking details.
request a special meal|yêu cầu suất ăn đặc biệt|We need to request a special meal before the flight.
ask for a blanket|xin chăn|You can ask for a blanket if you feel cold.
adjust your seat back|điều chỉnh lưng ghế|Please ask before you adjust your seat back.
follow the cabin crew's instructions|làm theo hướng dẫn của tiếp viên|Passengers should follow the cabin crew's instructions.
wait until the seat belt sign is off|chờ đến khi đèn báo thắt dây an toàn tắt|You need to wait until the seat belt sign is off.
check the flight arrival time|kiểm tra giờ máy bay đến|I will check the flight arrival time before leaving to meet you.
ask for proof of a flight delay|xin giấy xác nhận chuyến bay chậm|You can ask for proof of a flight delay at the service desk.
find the airline service desk|tìm quầy dịch vụ của hãng bay|We need to find the airline service desk to change our booking.
retrieve an item from lost property|nhận lại đồ từ bộ phận đồ thất lạc|I went back to retrieve an item from lost property.
leave the airport by train|rời sân bay bằng tàu|We can leave the airport by train after collecting our bags.
""")

everyday("Khách sạn và nơi lưu trú", 5, """
check in at the hotel|làm thủ tục nhận phòng khách sạn|We can check in at the hotel after three.
check out of the hotel|làm thủ tục trả phòng khách sạn|We need to check out of the hotel before eleven.
ask for an early check-in|xin nhận phòng sớm|I would like to ask for an early check-in.
request a late checkout|xin trả phòng muộn|You can request a late checkout at reception.
show your booking confirmation|đưa xác nhận đặt phòng|Please show your booking confirmation to the receptionist.
collect your room key|nhận chìa khóa phòng của bạn|You can collect your room key at the front desk.
ask for a quiet room|xin phòng yên tĩnh|I always ask for a quiet room away from the lift.
request a room with a view|xin phòng có tầm nhìn đẹp|We would like to request a room with a view of the sea.
check whether breakfast is included|kiểm tra giá phòng có gồm bữa sáng không|Let's check whether breakfast is included before booking.
ask about breakfast times|hỏi giờ phục vụ bữa sáng|Remember to ask about breakfast times at reception.
find the hotel reception|tìm quầy lễ tân khách sạn|We need to find the hotel reception to collect the key.
ask for the Wi-Fi password|xin mật khẩu Wi-Fi|You can ask for the Wi-Fi password at the desk.
report a problem with the room|báo vấn đề trong phòng|I need to report a problem with the room to reception.
request fresh towels|xin khăn sạch|Could you request fresh towels for our room?
ask for an extra pillow|xin thêm gối|I want to ask for an extra pillow tonight.
request room cleaning|yêu cầu dọn phòng|You can request room cleaning by calling reception.
leave a do-not-disturb sign|treo biển không làm phiền|Please leave a do-not-disturb sign on the door.
ask how to use the safe|hỏi cách dùng két sắt|I need to ask how to use the safe in our room.
report a broken air conditioner|báo máy điều hòa hỏng|We should report a broken air conditioner to the front desk.
ask for a different room|xin đổi sang phòng khác|I would like to ask for a different room because this one is noisy.
check the hot water supply|kiểm tra nước nóng|The hotel technician will check the hot water supply.
report a lost room key|báo mất chìa khóa phòng|You need to report a lost room key at reception.
ask for a wake-up call|nhờ gọi đánh thức|Can you ask for a wake-up call at six tomorrow?
order room service|gọi đồ ăn hoặc dịch vụ phục vụ tại phòng|We might order room service after the long trip.
check the minibar prices|kiểm tra giá đồ trong tủ lạnh mini|Let's check the minibar prices before opening anything.
ask about laundry service|hỏi dịch vụ giặt là|I need to ask about laundry service for my shirts.
leave your bags at reception|gửi hành lý ở quầy lễ tân|You can leave your bags at reception after checkout.
request a luggage tag|xin thẻ nhận hành lý gửi|Please request a luggage tag when you leave your suitcase.
ask for local recommendations|xin gợi ý địa điểm tại địa phương|We can ask for local recommendations at the hotel desk.
check the pool opening hours|kiểm tra giờ mở cửa hồ bơi|Let's check the pool opening hours before going downstairs.
reserve a parking spot|đặt trước chỗ đỗ xe|You may need to reserve a parking spot at this hotel.
check the visitor policy|kiểm tra quy định tiếp khách|I will check the visitor policy before inviting my friend over.
extend your stay|kéo dài thời gian lưu trú|You can ask reception if you want to extend your stay.
shorten your booking|rút ngắn thời gian đặt phòng|You may need to contact the hotel to shorten your booking.
check the room rate|kiểm tra giá phòng|I want to check the room rate for an extra night.
ask about a security deposit|hỏi khoản tiền đặt cọc bảo đảm|Remember to ask about a security deposit before arrival.
review the hotel bill|kiểm tra hóa đơn khách sạn|Please review the hotel bill before paying.
question an extra charge|hỏi lại về khoản phí thêm|I need to question an extra charge on my hotel bill.
request an itemized bill|xin hóa đơn liệt kê từng khoản|You can request an itemized bill at checkout.
settle the room bill|thanh toán tiền phòng|I would like to settle the room bill tonight.
ask for a receipt in your name|xin biên lai mang tên bạn|Remember to ask for a receipt in your name at checkout.
confirm the checkout time|xác nhận giờ trả phòng|Let's confirm the checkout time before planning tomorrow.
return your room key|trả chìa khóa phòng|Please return your room key to reception.
collect your stored luggage|nhận lại hành lý đã gửi|We need to collect your stored luggage before the taxi arrives.
report an item left in the room|báo đồ bỏ quên trong phòng|You can call the hotel to report an item left in the room.
ask about an accessible room|hỏi phòng có thiết kế hỗ trợ người cần tiếp cận thuận tiện|I would like to ask about an accessible room near the lift.
check the bed arrangement|kiểm tra cách bố trí giường|Please check the bed arrangement before confirming the family room.
request a baby cot|xin nôi cho em bé|We need to request a baby cot for our stay.
ask about luggage delivery|hỏi dịch vụ chuyển hành lý|You can ask about luggage delivery to your room.
leave a hotel review|viết đánh giá khách sạn|I plan to leave a hotel review after our trip.
""")


everyday("Nhà hàng, quán cà phê và gọi món", 5, """
book a table|đặt bàn trước|I'd like to book a table for four at seven.
ask for a table outside|xin bàn ở ngoài trời|We could ask for a table outside because the weather is nice.
wait to be seated|chờ được xếp bàn|The sign says we should wait to be seated.
look at the menu|xem thực đơn|Can we look at the menu before we decide?
ask about the daily special|hỏi món đặc biệt trong ngày|I want to ask about the daily special before ordering.
order a drink|gọi đồ uống|Would you like to order a drink while we wait?
ask for tap water|xin nước máy dùng để uống|You can ask for tap water if you don't want bottled water.
order a coffee|gọi cà phê|I am going to order a coffee and a sandwich.
ask for milk on the side|xin để sữa riêng bên cạnh|You can ask for milk on the side with your tea.
choose a main course|chọn món chính|We still need to choose a main course.
share a starter|ăn chung món khai vị|Let's share a starter before the main course.
ask how spicy it is|hỏi món ăn cay đến mức nào|I always ask how spicy it is before ordering that soup.
request a mild version|xin phiên bản ít cay|You can request a mild version of the curry.
ask what the dish contains|hỏi món ăn gồm nguyên liệu gì|I need to ask what the dish contains before I order.
mention a food allergy|nói rõ tình trạng dị ứng thực phẩm|Please mention a food allergy when speaking to the server.
ask for the dressing on the side|xin để sốt salad riêng|I would like to ask for the dressing on the side.
order without onions|gọi món không có hành|You can order without onions if you prefer.
ask for a vegetarian option|hỏi món dành cho người ăn chay|Let's ask for a vegetarian option for our guest.
check whether a dish is vegan|kiểm tra món ăn có hoàn toàn không dùng nguyên liệu động vật không|I need to check whether a dish is vegan before ordering.
request a smaller portion|xin phần ăn nhỏ hơn|You can request a smaller portion for a child.
order an extra side dish|gọi thêm món ăn kèm|We should order an extra side dish to share.
ask for another spoon|xin thêm một chiếc thìa|Could you ask for another spoon for the soup?
ask for more napkins|xin thêm khăn giấy|I need to ask for more napkins for our table.
get the server's attention|gọi để nhân viên phục vụ chú ý|Can you get the server's attention so we can order?
ask how long the food will take|hỏi bao lâu món ăn sẽ được mang ra|Let's ask how long the food will take because our train leaves soon.
check on your order|hỏi tiến độ món đã gọi|You can check on your order at the counter.
point out a missing dish|nói rõ còn thiếu một món|I need to point out a missing dish to the server.
send a dish back|yêu cầu mang món ăn trở lại bếp|You can send a dish back if it is not what you ordered.
ask for the food to be reheated|nhờ hâm nóng lại thức ăn|I would like to ask for the food to be reheated.
compliment the food|khen món ăn|We should compliment the food when the chef comes over.
ask for the bill|xin hóa đơn thanh toán|Could you ask for the bill while I get my coat?
split the bill|chia tiền thanh toán|We can split the bill between the four of us.
pay separately|thanh toán riêng từng người|We would like to pay separately, please.
check whether service is included|kiểm tra hóa đơn đã gồm phí phục vụ chưa|Let's check whether service is included before leaving a tip.
leave a tip|để lại tiền thưởng cho người phục vụ|I would like to leave a tip for the helpful server.
pay at the counter|thanh toán tại quầy|You need to pay at the counter in this café.
ask for a takeaway box|xin hộp mang thức ăn về|Can we ask for a takeaway box for the leftovers?
take the rest home|mang phần còn lại về nhà|I am too full, so I will take the rest home.
order food to go|gọi đồ ăn mang đi|We can order food to go and eat in the park.
place a delivery order|đặt đơn giao đồ ăn|I want to place a delivery order for six o'clock.
check the delivery fee|kiểm tra phí giao hàng|Please check the delivery fee before confirming our food order.
add delivery instructions|thêm hướng dẫn giao hàng|Remember to add delivery instructions about the side entrance.
track your food delivery|theo dõi đơn giao đồ ăn|You can track your food delivery in the app.
report the wrong order|báo nhận sai món hoặc sai đơn|I need to report the wrong order to the restaurant.
ask for a refund for a missing item|xin hoàn tiền cho món bị thiếu|You can ask for a refund for a missing item through the delivery service.
check the portion size|kiểm tra khẩu phần lớn hay nhỏ|Let's check the portion size before ordering two bowls.
ask for a recommendation from the server|nhờ nhân viên phục vụ gợi ý món|You could ask for a recommendation from the server.
reserve a private dining room|đặt phòng ăn riêng|We would like to reserve a private dining room for the celebration.
join the waiting list|ghi tên vào danh sách chờ|We can join the waiting list if all the tables are full.
confirm the restaurant address|xác nhận địa chỉ nhà hàng|Please confirm the restaurant address before we call a taxi.
""")

everyday("Thực phẩm, đi chợ và nấu ăn", 5, """
make a shopping list|lập danh sách cần mua|Let's make a shopping list before we go to the market.
buy fresh vegetables|mua rau tươi|I usually buy fresh vegetables at the morning market.
check the expiry date|kiểm tra ngày hết hạn|Remember to check the expiry date on the milk.
compare the price per kilo|so sánh giá theo mỗi kilôgam|You can compare the price per kilo on the shelf labels.
choose ripe fruit|chọn trái cây chín|The seller helped me choose ripe fruit for tonight.
ask for half a kilo|xin mua nửa kilôgam|You can ask for half a kilo of tomatoes.
bring a reusable bag|mang túi có thể dùng lại|Don't forget to bring a reusable bag to the market.
check the ingredients list|xem danh sách thành phần|I need to check the ingredients list on this sauce.
look for a dairy-free option|tìm lựa chọn không chứa sữa|We should look for a dairy-free option for the dessert.
buy food in bulk|mua thực phẩm với số lượng lớn|Some families buy food in bulk to save money.
put the frozen food away|cất thực phẩm đông lạnh đúng chỗ|I need to put the frozen food away when we get back.
keep the receipt for groceries|giữ hóa đơn mua thực phẩm|I like to keep the receipt for groceries to track spending.
follow a recipe|làm theo công thức nấu ăn|I find it easier to follow a recipe when baking.
measure the ingredients|đong đo nguyên liệu|We need to measure the ingredients before mixing them.
preheat the oven|làm nóng lò trước|The recipe says to preheat the oven before making the cake.
wash the vegetables|rửa rau|Could you wash the vegetables while I prepare the rice?
peel the potatoes|gọt vỏ khoai tây|I will peel the potatoes for the soup.
chop the onions|thái nhỏ hành|Can you chop the onions while I wash the herbs?
slice the bread|cắt bánh mì thành lát|Please slice the bread for our sandwiches.
grate the cheese|bào phô mai|We need to grate the cheese before adding it to the pasta.
crack an egg|đập trứng|Can you crack an egg into this bowl?
beat the eggs|đánh trứng|I will beat the eggs while you heat the pan.
mix the ingredients together|trộn các nguyên liệu với nhau|Use a large bowl to mix the ingredients together.
stir the sauce|khuấy sốt|Could you stir the sauce while I set the timer?
bring the water to a boil|đun nước đến khi sôi|We need to bring the water to a boil for the pasta.
turn down the heat|giảm nhiệt bếp|The recipe tells us to turn down the heat after adding the milk.
let it simmer|để món ăn sôi nhẹ|We can let it simmer while we prepare the salad.
season to taste|nêm nếm tùy khẩu vị|You can season to taste after the soup has cooked.
add a pinch of salt|thêm một chút muối|I usually add a pinch of salt to this mixture.
set a kitchen timer|đặt đồng hồ hẹn giờ nấu ăn|Let's set a kitchen timer so we remember the bread.
check whether it is cooked|kiểm tra món ăn đã chín chưa|We need to check whether it is cooked before serving it.
let the food cool|để thức ăn nguội bớt|We should let the food cool before packing it.
serve it while it is hot|dọn món ra khi còn nóng|I want to serve it while it is hot.
cut it into small pieces|cắt thành miếng nhỏ|You can cut it into small pieces for the salad.
drain the pasta|đổ nước và để mì ráo|I will drain the pasta while you finish the sauce.
save some cooking water|giữ lại một ít nước luộc|The recipe asks us to save some cooking water for the sauce.
heat up the leftovers|hâm nóng thức ăn còn lại|We can heat up the leftovers for lunch.
store food in a sealed container|bảo quản thức ăn trong hộp kín|I prefer to store food in a sealed container.
freeze an extra portion|đông lạnh một phần ăn dư|I often freeze an extra portion for another day.
defrost food in the fridge|rã đông thực phẩm trong tủ lạnh|The cooking guide explains how to defrost food in the fridge.
check the storage instructions|xem hướng dẫn bảo quản|Please check the storage instructions on the package.
use up the remaining ingredients|dùng hết nguyên liệu còn lại|We can make a soup to use up the remaining ingredients.
substitute one ingredient for another|thay nguyên liệu này bằng nguyên liệu khác|The recipe explains how to substitute one ingredient for another.
double the recipe|tăng gấp đôi lượng trong công thức|We need to double the recipe because more guests are coming.
reduce the amount of sugar|giảm lượng đường|I want to reduce the amount of sugar in this cake.
prepare the ingredients in advance|chuẩn bị nguyên liệu từ trước|We can prepare the ingredients in advance to save time.
divide it into portions|chia thành từng phần ăn|Let's divide it into portions before putting it away.
check for food waste|kiểm tra tình trạng lãng phí thực phẩm|We should check for food waste when planning next week's shopping.
ask where the fruit comes from|hỏi trái cây có nguồn gốc ở đâu|You can ask where the fruit comes from at the market stall.
buy what is in season|mua thực phẩm đang đúng mùa|I try to buy what is in season at the local market.
""")

everyday("Mua sắm và lựa chọn sản phẩm", 5, """
look around the shop|xem quanh cửa hàng|I'd like to look around the shop before choosing a gift.
ask for help finding an item|nhờ giúp tìm một mặt hàng|You can ask for help finding an item at the service desk.
compare different models|so sánh các mẫu sản phẩm|We should compare different models before buying a suitcase.
check the price tag|xem nhãn giá|I need to check the price tag on this jacket.
look for a smaller size|tìm cỡ nhỏ hơn|Could you help me look for a smaller size?
ask for a larger size|xin cỡ lớn hơn|I need to ask for a larger size because this shirt is tight.
try it on|mặc hoặc thử lên người|You can try it on in the changing room.
find the fitting room|tìm phòng thử đồ|Can you help me find the fitting room?
check how it fits|kiểm tra đồ mặc có vừa không|I want to check how it fits before I buy it.
ask if another color is available|hỏi có màu khác không|Let's ask if another color is available in this size.
look for something more comfortable|tìm thứ thoải mái hơn|I need to look for something more comfortable for the long walk.
check the material|kiểm tra chất liệu|I always check the material before buying a sweater.
read the care label|đọc nhãn hướng dẫn chăm sóc hoặc giặt|Remember to read the care label on this coat.
compare the quality|so sánh chất lượng|It helps to compare the quality before looking at the price.
ask for a recommendation|nhờ gợi ý|You can ask for a recommendation if you are choosing a gift.
look for a gift|tìm quà tặng|I want to look for a gift for my host.
ask for gift wrapping|yêu cầu gói quà|You can ask for gift wrapping at the counter.
check whether it is in stock|kiểm tra sản phẩm còn hàng không|The assistant can check whether it is in stock.
ask when it will be back in stock|hỏi khi nào sản phẩm có hàng lại|I need to ask when it will be back in stock.
reserve an item|giữ trước một món hàng|Can I reserve an item until tomorrow afternoon?
check another branch|kiểm tra chi nhánh khác|The assistant offered to check another branch for my size.
place an order in store|đặt hàng tại cửa hàng|You can place an order in store if the item is sold out.
browse the sale section|xem khu vực hàng giảm giá|Let's browse the sale section before leaving.
ask about a discount|hỏi về mức giảm giá|It is worth taking a moment to ask about a discount.
use a discount code|dùng mã giảm giá|You can use a discount code at checkout.
check the offer details|kiểm tra điều kiện của ưu đãi|Please check the offer details before buying two items.
compare prices online|so sánh giá trên mạng|I like to compare prices online before visiting the shop.
add an item to your cart|thêm sản phẩm vào giỏ hàng|You can add an item to your cart without paying yet.
remove an item from your cart|xóa sản phẩm khỏi giỏ hàng|You can remove an item from your cart before checkout.
save an item for later|lưu sản phẩm để xem hoặc mua sau|I will save an item for later if I am still deciding.
read customer reviews|đọc đánh giá của khách hàng|I usually read customer reviews before buying a bag.
check the product dimensions|kiểm tra kích thước sản phẩm|Remember to check the product dimensions before ordering a shelf.
check the size guide|xem bảng hướng dẫn chọn cỡ|You should check the size guide before ordering shoes online.
ask for a product demonstration|nhờ giới thiệu cách sản phẩm hoạt động|I would like to ask for a product demonstration before buying it.
test the display model|thử mẫu sản phẩm trưng bày|You can test the display model in the store.
check what is included|kiểm tra những gì được bán kèm|Let's check what is included in the box.
ask about the warranty|hỏi về bảo hành|Remember to ask about the warranty before paying.
keep the original packaging|giữ bao bì gốc|You may want to keep the original packaging until you check the item.
check for visible damage|kiểm tra hư hỏng có thể nhìn thấy|Please check for visible damage before accepting the package.
ask for a sealed box|xin hộp còn nguyên niêm phong|I would like to ask for a sealed box instead of the display item.
choose a different brand|chọn thương hiệu khác|We may choose a different brand if this one is unavailable.
look for a budget option|tìm lựa chọn phù hợp ngân sách thấp hơn|I want to look for a budget option for this trip.
wait for the next sale|chờ đợt giảm giá tiếp theo|I can wait for the next sale because I don't need it now.
check the delivery options|kiểm tra các lựa chọn giao hàng|We should check the delivery options before ordering furniture.
choose store pickup|chọn nhận hàng tại cửa hàng|You can choose store pickup at checkout.
confirm the pickup branch|xác nhận chi nhánh nhận hàng|Please confirm the pickup branch before placing your order.
ask how long the offer lasts|hỏi ưu đãi kéo dài đến khi nào|I need to ask how long the offer lasts before deciding.
compare two similar products|so sánh hai sản phẩm tương tự|The assistant helped us compare two similar products.
ask to see a sample|xin xem mẫu|You can ask to see a sample of the fabric.
decide against buying it|quyết định không mua món đó|I may decide against buying it if the size is wrong.
""")

everyday("Thanh toán, đổi hàng và hoàn tiền", 5, """
pay by card|thanh toán bằng thẻ|Can I pay by card for this purchase?
pay in cash|trả bằng tiền mặt|I would like to pay in cash today.
ask whether cards are accepted|hỏi cửa hàng có nhận thanh toán thẻ không|We should ask whether cards are accepted before ordering.
enter your PIN|nhập mã PIN của bạn|The machine will ask you to enter your PIN.
use contactless payment|dùng thanh toán không tiếp xúc|You can use contactless payment for this purchase.
check the total amount|kiểm tra tổng số tiền|Please check the total amount before confirming payment.
ask for a receipt|xin hóa đơn hoặc biên lai|Remember to ask for a receipt for your purchase.
check your change|kiểm tra tiền thừa được trả lại|You can check your change before leaving the counter.
ask for smaller notes|xin tiền giấy mệnh giá nhỏ hơn|I want to ask for smaller notes for the bus fare.
split the payment|chia khoản thanh toán thành nhiều phần hoặc phương thức|Can we split the payment between two cards?
check whether tax is included|kiểm tra giá đã gồm thuế chưa|I need to check whether tax is included in this price.
use a gift card|dùng thẻ quà tặng|You can use a gift card to pay for the book.
check your gift card balance|kiểm tra số dư thẻ quà tặng|The cashier can help you check your gift card balance.
redeem a voucher|đổi hoặc sử dụng phiếu ưu đãi|I would like to redeem a voucher for this purchase.
check the voucher expiry date|kiểm tra hạn sử dụng phiếu ưu đãi|Remember to check the voucher expiry date before visiting the shop.
ask about a payment error|hỏi về lỗi thanh toán|I need to ask about a payment error on the machine.
try a different payment method|thử phương thức thanh toán khác|You can try a different payment method if the card is declined.
confirm the payment went through|xác nhận thanh toán đã thành công|Let's confirm the payment went through before trying again.
report a duplicate charge|báo bị trừ tiền hai lần cho cùng giao dịch|I need to report a duplicate charge on my receipt.
check the order confirmation|kiểm tra xác nhận đơn hàng|Please check the order confirmation for the final price.
correct the billing address|sửa địa chỉ thanh toán|You can correct the billing address before placing the order.
request an electronic receipt|xin biên lai điện tử|I would like to request an electronic receipt instead of a paper one.
return an unwanted item|trả món hàng không còn muốn giữ|I want to return an unwanted item that is still unopened.
exchange it for a different size|đổi sang cỡ khác|Can I exchange it for a different size?
ask about the return policy|hỏi quy định đổi trả|You should ask about the return policy before buying a gift.
check the return deadline|kiểm tra hạn cuối được trả hàng|I need to check the return deadline on the receipt.
bring proof of purchase|mang giấy tờ chứng minh đã mua hàng|Please bring proof of purchase when returning the item.
explain why you are returning it|giải thích lý do trả hàng|The assistant may ask you to explain why you are returning it.
report a faulty item|báo sản phẩm bị lỗi|You can report a faulty item through the customer service page.
show the damage to the seller|cho người bán xem chỗ hỏng|I want to show the damage to the seller before asking for a replacement.
request a replacement|yêu cầu sản phẩm thay thế|I would like to request a replacement for this broken cup.
ask for a full refund|xin hoàn lại toàn bộ tiền|We want to ask for a full refund for the canceled order.
accept store credit|chấp nhận khoản tín dụng để mua hàng tại cửa hàng|I may accept store credit if I cannot exchange the item.
check the refund status|kiểm tra tình trạng hoàn tiền|You can check the refund status in your order history.
ask how long the refund will take|hỏi bao lâu sẽ được hoàn tiền|Remember to ask how long the refund will take.
return an online order|trả lại hàng đã mua trực tuyến|I need to return an online order because the shoes are too small.
print a return label|in nhãn gửi hàng trả lại|You can print a return label from the order page.
pack the item for return|đóng gói sản phẩm để trả lại|I will pack the item for return tonight.
book a return collection|đặt lịch đến lấy hàng trả|You can book a return collection through the retailer's website.
keep the return tracking number|giữ mã theo dõi kiện hàng trả lại|Remember to keep the return tracking number until your refund arrives.
cancel an order before shipping|hủy đơn trước khi gửi hàng|I hope to cancel an order before shipping begins.
change the delivery address|thay đổi địa chỉ giao hàng|You may still be able to change the delivery address.
report an item that never arrived|báo sản phẩm chưa được giao tới|I need to report an item that never arrived.
ask for a price adjustment|xin điều chỉnh lại giá|You can ask for a price adjustment if the store offers that service.
check the restocking fee|kiểm tra phí xử lý hàng trả lại|Let's check the restocking fee before returning this item.
request a copy of the receipt|xin bản sao biên lai|I need to request a copy of the receipt for the warranty.
ask about installment payments|hỏi việc trả góp|You can ask about installment payments at the service desk.
check the final payment date|kiểm tra ngày thanh toán cuối cùng|I want to check the final payment date before agreeing.
report an incorrect price|báo giá bị tính sai|I need to report an incorrect price at the checkout.
resolve a billing mistake|giải quyết sai sót trên hóa đơn|The shop manager helped us resolve a billing mistake.
""")

everyday("Bưu điện, bưu kiện và giao nhận", 4, """
send a parcel|gửi một bưu kiện|I need to send a parcel to my sister.
post a letter|gửi thư qua bưu điện|I want to post a letter before the collection time.
buy a stamp|mua tem|You can buy a stamp at the post office.
write the delivery address|viết địa chỉ giao hàng|Please write the delivery address clearly on the box.
include a return address|ghi kèm địa chỉ người gửi để hoàn trả|Remember to include a return address on the envelope.
check the postal code|kiểm tra mã bưu chính|I need to check the postal code before sending this card.
weigh the parcel|cân bưu kiện|The clerk will weigh the parcel to calculate the cost.
choose standard delivery|chọn giao hàng tiêu chuẩn|You can choose standard delivery if it is not urgent.
pay for express delivery|trả tiền giao hàng nhanh|I need to pay for express delivery because the documents are urgent.
ask about international postage|hỏi cước gửi ra nước ngoài|I want to ask about international postage for this package.
track a parcel|theo dõi bưu kiện|You can track a parcel using the number on your receipt.
check the estimated delivery date|kiểm tra ngày giao hàng dự kiến|Let's check the estimated delivery date before calling the courier.
request proof of delivery|xin xác nhận đã giao hàng|I need to request proof of delivery for these documents.
sign for a package|ký nhận bưu kiện|Someone needs to sign for a package at the door.
collect a parcel from the post office|nhận bưu kiện ở bưu điện|I have to collect a parcel from the post office this afternoon.
show the collection notice|đưa giấy báo nhận hàng|Please show the collection notice to the clerk.
bring photo identification|mang giấy tờ tùy thân có ảnh|You may need to bring photo identification to collect the parcel.
arrange a redelivery|sắp xếp giao lại hàng|I want to arrange a redelivery for Saturday.
reschedule a delivery|đổi lịch giao hàng|You can reschedule a delivery through the courier's website.
choose a collection point|chọn điểm nhận hàng|I prefer to choose a collection point near the station.
use a parcel locker|dùng tủ nhận bưu kiện|You can use a parcel locker if you are not home during the day.
enter the collection code|nhập mã nhận hàng|Please enter the collection code to open the locker.
check the collection deadline|kiểm tra hạn cuối nhận hàng|Remember to check the collection deadline in the message.
report a missing parcel|báo bưu kiện thất lạc|I need to report a missing parcel to the courier.
report damaged packaging|báo bao bì bị hư hỏng|You can report damaged packaging when you contact customer service.
take a photo of the damage|chụp ảnh chỗ hư hỏng|I want to take a photo of the damage before opening the box.
check the delivery signature|kiểm tra chữ ký xác nhận giao hàng|The courier can check the delivery signature for you.
confirm who received the parcel|xác nhận ai đã nhận bưu kiện|We need to confirm who received the parcel yesterday.
correct an incomplete address|sửa địa chỉ chưa đầy đủ|The sender must correct an incomplete address before redelivery.
forward your mail|chuyển tiếp thư của bạn đến địa chỉ mới|The post office can forward your mail while you move.
hold your mail while you are away|giữ thư trong thời gian bạn vắng nhà|You can ask the post office to hold your mail while you are away.
fill out a customs form|điền tờ khai hải quan|You may need to fill out a customs form for this parcel.
describe the parcel contents|mô tả đồ bên trong bưu kiện|Please describe the parcel contents on the form.
declare the value of the goods|khai giá trị hàng hóa|You need to declare the value of the goods on this form.
check the prohibited items list|kiểm tra danh sách đồ không được gửi|Remember to check the prohibited items list before packing.
ask about parcel insurance|hỏi bảo hiểm bưu kiện|I want to ask about parcel insurance for this camera.
choose a padded envelope|chọn phong bì có lớp đệm|You can choose a padded envelope for the small gift.
wrap a fragile item|bọc món đồ dễ vỡ|I need to wrap a fragile item before putting it in the box.
seal the box|dán kín hộp|Please seal the box before handing it to the clerk.
attach the shipping label|dán nhãn vận chuyển|Remember to attach the shipping label to the outside of the box.
remove the old address label|gỡ nhãn địa chỉ cũ|I need to remove the old address label before reusing this box.
check the last collection time|kiểm tra giờ lấy thư cuối cùng|Let's check the last collection time on the postbox.
request recorded delivery|yêu cầu gửi có xác nhận giao nhận|You can request recorded delivery for important documents.
ask for a postage receipt|xin biên lai gửi bưu phẩm|Remember to ask for a postage receipt at the counter.
send a registered letter|gửi thư bảo đảm|I need to send a registered letter to the office.
return a parcel to the sender|hoàn bưu kiện về người gửi|The courier may return a parcel to the sender if the address is wrong.
check the parcel size limit|kiểm tra giới hạn kích thước bưu kiện|You should check the parcel size limit before choosing a box.
schedule a courier pickup|hẹn nhân viên chuyển phát đến lấy hàng|We can schedule a courier pickup for tomorrow morning.
ask the courier to call on arrival|nhờ nhân viên giao hàng gọi khi đến|Please ask the courier to call on arrival.
confirm the parcel has been delivered|xác nhận bưu kiện đã được giao|The tracking page can confirm the parcel has been delivered.
""")

everyday("Ngân hàng và dịch vụ tại địa phương", 4, """
open a bank account|mở tài khoản ngân hàng|I need to open a bank account after moving here.
book an appointment at the bank|đặt lịch hẹn tại ngân hàng|You can book an appointment at the bank online.
ask what documents are required|hỏi cần những giấy tờ gì|I want to ask what documents are required before visiting the branch.
show proof of address|xuất trình giấy tờ chứng minh địa chỉ|The bank asked me to show proof of address.
check your account balance|kiểm tra số dư tài khoản của bạn|You can check your account balance at the ATM.
withdraw some cash|rút một ít tiền mặt|I need to withdraw some cash for the market.
deposit money into your account|nộp tiền vào tài khoản của bạn|You can deposit money into your account at this branch.
transfer money to another account|chuyển tiền đến tài khoản khác|I need to transfer money to another account to pay the rent.
confirm the recipient's details|xác nhận thông tin người nhận|Please confirm the recipient's details before making the transfer.
check the transfer fee|kiểm tra phí chuyển tiền|I want to check the transfer fee before sending money.
ask about the daily withdrawal limit|hỏi hạn mức rút tiền mỗi ngày|You can ask about the daily withdrawal limit at the bank.
request a bank statement|xin sao kê ngân hàng|I need to request a bank statement for my records.
report a lost bank card|báo mất thẻ ngân hàng|You can report a lost bank card through the bank's official service.
ask for a replacement card|xin thẻ thay thế|I need to ask for a replacement card because mine is damaged.
activate a new bank card|kích hoạt thẻ ngân hàng mới|The letter explains how to activate a new bank card.
check when your card expires|kiểm tra khi nào thẻ hết hạn|Remember to check when your card expires before traveling.
update your contact details|cập nhật thông tin liên hệ của bạn|You can update your contact details through the bank's service desk.
ask about an unfamiliar transaction|hỏi về giao dịch không nhận ra|I need to ask about an unfamiliar transaction on my statement.
check a pending transaction|kiểm tra giao dịch đang chờ xử lý|The bank agent can help me check a pending transaction.
set up a standing order|thiết lập lệnh chuyển tiền định kỳ với số tiền cố định|I want to set up a standing order for my monthly rent.
review a direct debit|kiểm tra khoản thanh toán tự động được ủy quyền|I need to review a direct debit on my account.
cancel a scheduled payment|hủy khoản thanh toán đã lên lịch|I would like to cancel a scheduled payment that is no longer needed.
exchange foreign currency|đổi ngoại tệ|You can exchange foreign currency at this branch.
ask about exchange fees|hỏi phí đổi tiền|We should ask about exchange fees before changing cash.
request smaller denominations|xin tiền mệnh giá nhỏ hơn|I would like to request smaller denominations for the trip.
report a problem with an ATM|báo sự cố với máy ATM|I need to report a problem with an ATM outside the branch.
ask for help with a form|nhờ giúp điền hoặc hiểu biểu mẫu|You can ask for help with a form at the service counter.
take a queue number|lấy số thứ tự chờ|Please take a queue number when you arrive.
wait for your number to be called|chờ đến khi được gọi số của bạn|You need to wait for your number to be called.
find the customer service desk|tìm quầy dịch vụ khách hàng|Can you help me find the customer service desk?
ask about the service charge|hỏi phí dịch vụ|I want to ask about the service charge before agreeing.
request a written confirmation|xin xác nhận bằng văn bản|You can request a written confirmation of the appointment.
keep a record of the payment|giữ thông tin ghi nhận khoản đã thanh toán|I like to keep a record of the payment for each bill.
pay a utility bill|thanh toán hóa đơn điện nước hoặc dịch vụ sinh hoạt|I need to pay a utility bill at the service counter.
check the meter reading|kiểm tra số trên đồng hồ điện hoặc nước|We should check the meter reading before calling the supplier.
report an incorrect bill|báo hóa đơn sai|You can report an incorrect bill through customer service.
ask for a payment receipt|xin biên lai thanh toán|Remember to ask for a payment receipt after paying the bill.
change the name on an account|đổi tên đứng tài khoản dịch vụ|I need to change the name on an account after moving.
arrange a service appointment|sắp xếp lịch hẹn cung cấp hoặc sửa dịch vụ|You can arrange a service appointment by calling this number.
confirm the technician's arrival time|xác nhận giờ kỹ thuật viên đến|I want to confirm the technician's arrival time before leaving home.
get a key copied|làm thêm bản sao chìa khóa|I need to get a key copied at the shop near the station.
have your shoes repaired|mang giày đi sửa|You can have your shoes repaired at the market.
drop off clothes at the dry cleaner's|gửi quần áo ở tiệm giặt khô|I need to drop off clothes at the dry cleaner's before work.
ask when your clothes will be ready|hỏi khi nào quần áo giặt xong|Remember to ask when your clothes will be ready.
collect your dry cleaning|nhận quần áo đã giặt khô|You can collect your dry cleaning after four tomorrow.
ask about same-day service|hỏi dịch vụ hoàn thành trong ngày|I want to ask about same-day service for this jacket.
get a document photocopied|nhờ photocopy tài liệu|I need to get a document photocopied before my appointment.
print a document at a copy shop|in tài liệu ở tiệm in|You can print a document at a copy shop near the station.
ask for a passport photo|yêu cầu chụp ảnh làm hộ chiếu|I need to ask for a passport photo at the photo studio.
check the local service directory|tra danh bạ dịch vụ tại địa phương|You can check the local service directory to find a repair shop.
""")


# Topic-specific situations keep examples relevant to the action being practised.
IT_CONTEXTS = [
    ("nhờ hỗ trợ và mô tả sự cố kỹ thuật", "during the support call", "so the support team has the details"),
    ("quản lý tài khoản và quyền truy cập", "before using the shared workspace", "as part of the account setup"),
    ("đăng nhập, xác thực và bảo vệ tài khoản", "when signing in", "before trying again"),
    ("sử dụng máy tính và điện thoại công việc", "before starting work", "while setting up the device"),
    ("sử dụng máy in và thiết bị ngoại vi", "before the next meeting", "while setting up the equipment"),
    ("kết nối mạng và xử lý sự cố Internet", "while checking the connection", "before testing the connection again"),
]


def examples(chunk, index, topic_index):
    # Standalone requests avoid attaching arbitrary temporal clauses to actions
    # such as revoking access after a departure or restoring permissions.
    authored = {
        "describe the steps you tried": ["Could you describe the steps you tried before the error appeared?", "Please describe the steps you tried so I can reproduce the problem.", "Can you describe the steps you tried on your laptop?"],
        "explain what you expected": ["Can you explain what you expected when you clicked Save?", "Please explain what you expected to see on the screen.", "Could you explain what you expected before we check the settings?"],
        "contact the help desk": ["You can contact the help desk if your laptop stops working.", "Could you contact the help desk about the login error?", "I need to contact the help desk before my account expires."],
        "open a support ticket": ["Please open a support ticket for the broken printer.", "Can I open a support ticket through the portal?", "We need to open a support ticket because the problem keeps coming back."],
        "report a technical issue": ["I would like to report a technical issue with my laptop.", "Can you report a technical issue through this form?", "Please report a technical issue as soon as it affects your work."],
        "revoke access after departure": ["We need to revoke access after departure to protect company data.", "Does IT revoke access after departure automatically?", "Please revoke access after departure according to the account policy."],
        "restore your previous permissions": ["IT can restore your previous permissions after the review.", "Do you need us to restore your previous permissions?", "The administrator will restore your previous permissions if they are still approved."],
        "test it while we are connected": ["Can you test it while we are connected?", "Let's test it while we are connected so I can see the error.", "It would help to test it while we are connected."],
    }
    if chunk in authored:
        return authored[chunk]
    if "your" in chunk:
        return [f"Could you {chunk}, please?", f"You may need to {chunk}.",
                f"The guide explains how to {chunk}."]
    sets = [
        [f"Can you {chunk}?", f"I need to {chunk}.", f"The support team can help us {chunk}."],
        [f"We should {chunk}.", f"Could you help me {chunk}?", f"The next step is to {chunk}."],
        [f"Please {chunk}.", f"Do you know how to {chunk}?", f"I can show you how to {chunk}."],
    ]
    return sets[index % len(sets)]


def everyday_examples(chunk, model):
    # The original model supplies a concrete scenario; the two additional forms
    # practise a question and a request without inventing a conflicting situation.
    if chunk == "miss the last train":
        return [model, "Will we miss the last train if we leave at eleven?",
                "You might miss the last train, so check the timetable."]
    if chunk == "make a connecting flight":
        return [model, "Can we make a connecting flight with only forty minutes between flights?",
                "You may need to hurry to make a connecting flight."]
    if chunk == "decide against buying it":
        return [model, "Why did you decide against buying it?",
                "You might decide against buying it after comparing the prices."]
    suffix = model.split(chunk, 1)[1].rstrip(".?!")
    if suffix.endswith(", please"):
        suffix = suffix[:-8]
    # These variations address the listener. Convert first-person references in
    # the tail as well: "before I order" must become "before you order".
    # A suggestion suits personal choices (travel, purchases, meals) better than
    # mechanically asking someone to perform every action as a favour.
    replacements = {"I": "you", "my": "your", "me": "you", "myself": "yourself"}
    suffix = re.sub(r"\b(I|my|me|myself)\b", lambda match: replacements[match[0]], suffix)
    suffix = suffix.replace("you am ", "you are ")
    question = f"Would you like to {chunk}{suffix}?"
    suggestion = f"You might want to {chunk}{suffix}."
    if question == model:
        question = f"Do you want to {chunk}{suffix}?"
    if suggestion == model:
        suggestion = f"You could {chunk}{suffix}."
    assert question != model and suggestion != model
    return [model, question, suggestion]


COMMON_EVERYDAY = {
    "plan a trip", "book a flight", "make a reservation", "pack your bags",
    "catch a bus", "take the train", "get on the bus", "get off at the next stop",
    "ask for directions", "go straight ahead", "cross the road", "call a taxi",
    "get in the car", "find a parking space", "pay by card", "pay in cash",
    "ask for a receipt", "ask for a table", "order a coffee", "ask for the bill",
    "buy a stamp", "send a parcel", "withdraw some cash", "check your account balance",
}
SPECIALIST_TERMS = (
    "expiry", "allowance", "insurance", "visa", "customs", "boarding group",
    "prohibited", "restocking", "denominations", "standing order", "direct debit",
    "recorded delivery", "registered letter", "installment", "DHCP", "DNS",
    "IP address", "proxy", "certificate", "firmware", "driver", "administrator",
    "asset number", "permissions", "group membership", "password vault",
)


def priority(chunk, category, topic_index=0):
    # Editorial breadth of use, not measured corpus frequency. Band 5 is for
    # everyday essentials; precise technical and service requests are narrower.
    if any(term.casefold() in chunk.casefold() for term in SPECIALIST_TERMS):
        return 2
    if category == "IT":
        return 4 if chunk in {"contact the help desk", "restart your computer", "reset your password", "sign in to your account", "check your internet connection", "charge your laptop", "attach a screenshot"} else 3
    if chunk in COMMON_EVERYDAY:
        return 5
    if chunk.startswith(("request", "report", "declare", "validate", "confirm", "activate", "redeem", "reschedule")) or "policy" in chunk:
        return 3
    return 4


def build():
    result = []
    for topic_index, (topic, frequency, context, entries) in enumerate(GROUPS[:6]):
        for entry_index, (chunk, meaning) in enumerate(entries):
            chunk = chunk.strip()
            number = len(result) + 1
            result.append({
                "id": f"it-{number:04d}",
                "category": "IT",
                "chunk": chunk,
                "explanation": f"{meaning.strip().capitalize()}. Dùng khi {IT_CONTEXTS[topic_index][0]}.",
                "examples": examples(chunk, entry_index, topic_index),
                "frequency": priority(chunk, "IT", topic_index),
                "topic": topic,
            })
    for topic, frequency, entries in GENERAL_GROUPS:
        for chunk, meaning, model in entries:
            number = sum(item["category"] == "Everyday" for item in result) + 1
            result.append({
                "id": f"general-{number:04d}", "category": "Everyday",
                "chunk": chunk, "explanation": f"{meaning[0].upper() + meaning[1:]}. Chủ đề: {topic.lower()}.",
                "examples": everyday_examples(chunk, model),
                "frequency": priority(chunk, "Everyday"), "topic": topic,
            })
    assert len(result) == 850, len(result)
    assert sum(item["category"] == "IT" for item in result) == 300
    assert sum(item["category"] == "Everyday" for item in result) == 550
    assert len({item["chunk"].lower() for item in result}) == 850, "Duplicate chunk"
    for item in result:
        assert len(item["examples"]) == len(set(item["examples"])) == 3
        assert all(item["chunk"].lower() in example.lower() for example in item["examples"])
        assert all(example.endswith((".", "?", "!")) for example in item["examples"])
    result.sort(key=lambda item: -item["frequency"])
    output = Path(__file__).resolve().parents[2] / "src/content/chunks/it.json"
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(result)} unique IT and Everyday chunks to {output}")


if __name__ == "__main__":
    build()
