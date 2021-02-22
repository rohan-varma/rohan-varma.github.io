from enum import Enum

class Dbg(Enum):
    OFF = "off"
    DEBUG = "debug"




b = Dbg.OFF
d = "debug"
import pdb ; pdb.set_trace()
