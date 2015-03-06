set my_boxes to {"%s"}
set box_user to "%s"
set pemfile to "%s"
tell application "iTerm"
	activate
	set t to (current terminal)
	tell t
		(* Loop over the boxes, create a new tab and connect. *)
		repeat with box in my_boxes
			activate current session
			launch session "Default Session"
			tell the last session
				set conn to "ssh -i " & pemfile & " " & box_user & "@" & box
				write text conn
			end tell
		end repeat
	end tell
end tell
